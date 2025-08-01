import { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, LinearProgress, TextField, Typography } from '@mui/material';
import { LineChart, PieChart } from '@mui/x-charts';

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

    useEffect(() => {
        getDiagnosisDistribution();
    }, []);

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
            console.log({ diagnosis_result });
        } catch (error) {
            await new Promise(resolve => setTimeout(resolve, 3000));
            setLoading(false);
            setDiagnosisResult('common cold');
            console.error(error);
        }
    };

    const getDiagnosisDistribution = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/diagnosis');
            if (!response.ok) {
                throw new Error('Failed to create diagnosis');
            }
            const data = await response.json();
            setAllData(data);
            console.log({ data });
        } catch (error) {
            const data = [
                {
                    "id": 2,
                    "input": "HELLO",
                    "diagnosis": "common cold",
                    "inserted_at": "2025-07-31T16:39:24"
                },
                {
                    "id": 3,
                    "input": "hello it's me",
                    "diagnosis": "common cold",
                    "inserted_at": "2025-07-31T16:47:13"
                },
                {
                    "id": 4,
                    "input": "yoyo",
                    "diagnosis": "common cold",
                    "inserted_at": "2025-07-31T16:49:03"
                },
                {
                    "id": 5,
                    "input": "aaaa",
                    "diagnosis": "asthma",
                    "inserted_at": "2025-07-31T16:49:13"
                },
                {
                    "id": 6,
                    "input": "I'm sick",
                    "diagnosis": "fleas",
                    "inserted_at": "2025-07-31T16:58:17"
                },
                {
                    "id": 7,
                    "input": "heloo",
                    "diagnosis": "asthma",
                    "inserted_at": "2025-08-01T18:20:13"
                },
                {
                    "id": 8,
                    "input": "wdwd",
                    "diagnosis": "fleas",
                    "inserted_at": "2025-08-01T18:22:00"
                },
                {
                    "id": 9,
                    "input": "ewgew",
                    "diagnosis": "asthma",
                    "inserted_at": "2025-08-01T18:27:06"
                },
                {
                    "id": 10,
                    "input": "dqwdwd",
                    "diagnosis": "common cold",
                    "inserted_at": "2025-08-01T18:33:58"
                },
                {
                    "id": 11,
                    "input": "xfgbh",
                    "diagnosis": "ear infection",
                    "inserted_at": "2025-08-01T18:35:10"
                },
                {
                    "id": 12,
                    "input": "dfwf",
                    "diagnosis": "common cold",
                    "inserted_at": "2025-08-01T18:35:16"
                },
                {
                    "id": 13,
                    "input": "SDSD",
                    "diagnosis": "asthma",
                    "inserted_at": "2025-08-01T18:41:02"
                },
                {
                    "id": 14,
                    "input": "oiu9i",
                    "diagnosis": "fleas",
                    "inserted_at": "2025-08-01T18:43:54"
                },
                {
                    "id": 15,
                    "input": "wdwd",
                    "diagnosis": "ear infection",
                    "inserted_at": "2025-08-01T18:59:15"
                },
                {
                    "id": 16,
                    "input": "fww",
                    "diagnosis": "ear infection",
                    "inserted_at": "2025-08-01T18:59:51"
                },
                {
                    "id": 17,
                    "input": "my dog is itching a lot",
                    "diagnosis": "fleas",
                    "inserted_at": "2025-08-01T19:02:20"
                },
                {
                    "id": 18,
                    "input": "dqdqd",
                    "diagnosis": "common cold",
                    "inserted_at": "2025-08-01T19:03:22"
                },
                {
                    "id": 19,
                    "input": "my dog is itching a lot. there's poop on the floor",
                    "diagnosis": "asthma",
                    "inserted_at": "2025-08-01T19:03:49"
                },
                {
                    "id": 20,
                    "input": "dwdw",
                    "diagnosis": "fleas",
                    "inserted_at": "2025-08-01T19:05:57"
                },
                {
                    "id": 21,
                    "input": "fleas",
                    "diagnosis": "fleas",
                    "inserted_at": "2025-08-01T19:17:40"
                },
                {
                    "id": 22,
                    "input": "fleas",
                    "diagnosis": "common cold",
                    "inserted_at": "2025-08-01T19:22:23"
                },
                {
                    "id": 23,
                    "input": "my dog is itching a lot and there's brown spots where he's lying",
                    "diagnosis": "common cold",
                    "inserted_at": "2025-08-01T19:22:46"
                },
                {
                    "id": 24,
                    "input": "My dog's ears stink",
                    "diagnosis": "common cold",
                    "inserted_at": "2025-08-01T19:22:56"
                },
                {
                    "id": 25,
                    "input": "fleas",
                    "diagnosis": "Fleas\n",
                    "inserted_at": "2025-08-01T19:27:05"
                },
                {
                    "id": 26,
                    "input": "hello",
                    "diagnosis": "common cold",
                    "inserted_at": "2025-08-01T19:28:22"
                },
                {
                    "id": 27,
                    "input": "fleas",
                    "diagnosis": "fleas.",
                    "inserted_at": "2025-08-01T19:28:28"
                },
                {
                    "id": 28,
                    "input": "fleas",
                    "diagnosis": "fleas",
                    "inserted_at": "2025-08-01T19:28:56"
                },
                {
                    "id": 29,
                    "input": "my dog's ears smell sour",
                    "diagnosis": "ear infection",
                    "inserted_at": "2025-08-01T19:29:30"
                },
                {
                    "id": 30,
                    "input": "qqss",
                    "diagnosis": "ear infection",
                    "inserted_at": "2025-08-01T20:05:10"
                }
            ];
            setAllData(data);
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

    const getLineChartDiagnosticData = (data: dataEntry[]) => {
        const countsByDate: { [key: string]: number } = {};

        data.forEach((item) => {
            const date = item.inserted_at.split('T')[0];
            countsByDate[date] = (countsByDate[date] || 0) + 1;
        });

        const sortedDates = Object.keys(countsByDate).sort();
        const xAxisData = sortedDates.map(dateStr => new Date(dateStr));
        const seriesData = sortedDates.map(dateStr => countsByDate[dateStr]);

        return (
            <LineChart
                xAxis={[{ data: xAxisData, scaleType: 'time' }]}
                series={[
                    {
                        data: seriesData
                    },
                ]}
                height={300}
            />
        );
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
                    { !!allData.length && 
                        <PieChart
                            series={[
                                {
                                    data: getPieChartDiagnosticData(allData)
                                },
                            ]}
                            width={200}
                            height={200}
                        />
                    }
                </div>
                <div className={classes.item}>
                    <img
                        className={classes.image}
                        src="/src/assets/cute_pets.svg"
                        alt="cute pets" 
                    />
                </div>
                <div className={classes.item}>    
                    { !!allData.length && 
                        <div>
                            <Typography>
                                Most Recent Prompt:
                            </Typography>
                            <Typography>
                                {allData[allData.length - 1].input}
                            </Typography>
                        </div>
                    }
                </div>
                <div className={classes.item}>
                    {!!allData.length && getLineChartDiagnosticData(allData)}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;