require Logger

defmodule ElixirProject.Gemini do
  def get_diagnosis(input_prompt) do
    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

    Logger.info(Application.get_env(:elixir_project, :gemini_api_key));

    headers = [
      {"Content-Type", "application/json"},
      {"X-goog-api-key", Application.get_env(:elixir_project, :gemini_api_key)}
    ]

    body = %{
      contents: [
        %{
          parts: [
            %{
              text: input_prompt
            }
          ]
        }
      ]
    }

    case HTTPoison.post(url, Jason.encode!(body), headers) do
      {:ok, %HTTPoison.Response{status_code: 200, body: response_body}} ->
        {:ok, Jason.decode!(response_body)}

      {:ok, %HTTPoison.Response{status_code: status_code, body: error_body}} ->
        {:error, "API Error: #{status_code} - #{error_body}"}

      {:error, %HTTPoison.Error{reason: reason}} ->
        {:error, "HTTP Request Failed: #{reason}"}
    end
  end
end
