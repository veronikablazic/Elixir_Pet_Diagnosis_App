import { Fragment, useEffect, useState } from 'react';
import { Alert, Button, CircularProgress, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, LinearProgress, TextField, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts';
import { Channel, Socket } from 'phoenix';

import classes from './Dashboard.module.css';

interface dataEntry {
    id: number,
    input: string,
    diagnosis: string,
    inserted_at: string
};

interface PieSlice {
    id: string,
    label: string,
    value: number
}

const Dashboard = () => {
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [dialogText, setDialogText] = useState<string>('');
    const [diagnosisResult, setDiagnosisResult] = useState<string>('');
    const [allData, setAllData] = useState<dataEntry[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [channel, setChannel] = useState<Channel>();
    const [dataOutOfDate, setDataOutOfDate] = useState<boolean>(false);
    const [sessionId, setSessionId] = useState<string>('');

    useEffect(() => {
        getDiagnosisDistribution();
        setSessionId(crypto.randomUUID());
    }, []);

    useEffect(() => {
        const socket = new Socket('ws://localhost:4000/socket');
        socket.connect();

        const newChannel = socket.channel('data:lobby');
        setChannel(newChannel);

        return () => {
            socket.disconnect();
        }
    }, []);

    useEffect(() => {
        if (!channel) {
            return;
        }

        channel.on('new_msg', (payload) => {
            setDataOutOfDate(payload.sessionId !== sessionId);
        });

        channel.join()
            .receive('ok', (resp) => {
                console.log('Successfully joined the channel', resp);
            })
            .receive('error', (resp) => {
                console.error('Unable to join the channel', resp);
            });

        return () => {
            channel.leave();
        };
    }, [channel]);

    const onSubmit = async (dialogText: string): Promise<void> => {
        try {
            const response = await fetch('http://localhost:4000/api/diagnosis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: dialogText
                })
            });

            if (!response.ok) {
                throw new Error('Failed to create diagnosis');
            }
            const { diagnosis_result } = await response.json();
            setDiagnosisResult(diagnosis_result);
            await getDiagnosisDistribution();

            if(channel) {
                channel.push('new_msg', {
                    body: 'change made',
                    sessionId: sessionId
                });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getDiagnosisDistribution = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/diagnosis');
            if (!response.ok) {
                throw new Error('Failed to create diagnosis');
            }
            const data = await response.json();
            setAllData(data.diagnosis_data);
        } catch (error) {
            console.error(error);
        }
    };

    const getPieChartDiagnosticData = (data: dataEntry[]): PieSlice[] => {
        const diagnosisCounts: Record<string, number> = {};

        for (const entry of data) {
            const diagnosis = entry.diagnosis.trim().toLowerCase().replace(/[.\n]/g, '');
            diagnosisCounts[diagnosis] = (diagnosisCounts[diagnosis] || 0) + 1;
        }

        const pieData = Object.keys(diagnosisCounts).map((diagnosisKey): PieSlice => {
            return {
                id: diagnosisKey,
                label: diagnosisKey.replace(/\b\w/g, char => char.toUpperCase()),
                value: diagnosisCounts[diagnosisKey],
            };
        });

        return pieData;
    };

    return (
        <div className={classes.root}>
            { showDialog && 
                <Dialog fullWidth open>
                    <DialogTitle id="alert-dialog-title">
                        { diagnosisResult ? 'Result' : 'Enter New Symptoms'}
                    </DialogTitle>
                    { loading && <LinearProgress /> }
                    { !diagnosisResult ? 
                        <DialogContent>
                            <DialogContentText>
                                Enter symptoms your pet is showing to get a diagnosis:
                            </DialogContentText>
                            <TextField
                                fullWidth
                                multiline
                                onChange={(event) => setDialogText(event.target.value)}
                                rows={4}
                                value={dialogText}
                            />
                        </DialogContent> : 
                        <DialogContent>
                            <DialogContentText>
                                Your diagnosis is {diagnosisResult}.
                            </DialogContentText>
                        </DialogContent>
                    }
                    <DialogActions>
                        <Button 
                            onClick={() => {
                                setShowDialog(false);
                                setDiagnosisResult('');
                                setDialogText('');
                            }}
                        >
                            Close
                        </Button>
                        { !diagnosisResult &&                       
                            <Button
                                disabled={loading}
                                onClick={async () => {
                                    setDiagnosisResult('');
                                    setLoading(true);
                                    await onSubmit(dialogText);
                                }} 
                                variant='contained'
                            >
                                Submit
                            </Button>
                        }
                    </DialogActions>
                </Dialog>
            }
            <div className={classes['items-container']}>            
                <div className={classes.item}>
                    <Button onClick={() => setShowDialog(true)} variant='contained'>Get a New Diagnosis</Button>
                </div>
                <div className={classes.item}>    
                    { allData.length ? 
                        <PieChart
                            series={[
                                {
                                    data: getPieChartDiagnosticData(allData)
                                },
                            ]}
                            width={200}
                            height={200}
                        /> :
                        <CircularProgress />
                    }
                </div>
                <div className={classes['text-item']}>    
                    { !!allData.length &&
                        <Fragment>
                            <div>
                                <Typography fontWeight={700}>
                                    Most Recent Input:
                                </Typography>
                                <Typography>
                                    {allData[allData.length - 1]?.input || 'Random input.'}
                                </Typography>
                            </div>
                            <div className={classes['sub-item']}>
                                <Typography fontWeight={700}>
                                    Diagnosis:
                                </Typography>
                                <Typography>
                                    {allData[allData.length - 1]?.diagnosis || 'Common cold.'}
                                </Typography>
                                { dataOutOfDate && 
                                    <Alert severity='warning'>
                                        Out of Date
                                    </Alert>
                                }
                            </div>
                        </Fragment> 
                    }
                </div>
            </div>
        </div>
    );
}

export default Dashboard;