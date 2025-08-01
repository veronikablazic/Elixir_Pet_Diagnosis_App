require Logger

defmodule ElixirProjectWeb.MessageController do
  use ElixirProjectWeb, :controller

  def index(conn, _params) do
    # This is the data we will send to the frontend
    data = %{message: "Hello from your Elixir API!", timestamp: DateTime.utc_now()}
    Logger.info(data)

    # The json function handles sending the data as a JSON response
    json(conn, data)
  end
end
