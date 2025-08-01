require Logger

defmodule ElixirProjectWeb.DiagnosisController do
  use ElixirProjectWeb, :controller

  def create(conn, %{"message" => message}) do
    possible_diagnosis = ["common cold", "asthma", "fleas", "ear infection"]

    prompt = "Respond to prompt using one of the following terms that best describe it:"
      <> Enum.join(possible_diagnosis, ", ")
      <> ". Respond ONLY using one of those terms. Do not use any special characters."
      <> message

    {:ok, response} = ElixirProject.Gemini.get_diagnosis(prompt)

    candidates = Map.get(response, "candidates", [])
    content = Map.get(List.first(candidates), "content", [])
    parts = Map.get(content, "parts", [])
    diagnosis_result = String.downcase(String.trim(Map.get(List.first(parts), "text", [])))

    diagnosis = %ElixirProject.Diagnosis{input: message, diagnosis: diagnosis_result}
    ElixirProject.Repo.insert(diagnosis)

    response_data = %{status: "success", received_message: message, diagnosis_result: diagnosis_result}
    json(conn, response_data)
  end

  def get_all(conn, _params) do
    Logger.info("hello")
    diagnosis_data = ElixirProject.Repo.all(ElixirProject.Diagnosis)
    json(conn, %{status: "success", diagnosis_data: diagnosis_data})
  end
end
