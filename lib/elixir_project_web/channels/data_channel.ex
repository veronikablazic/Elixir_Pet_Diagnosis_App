defmodule ElixirProjectWeb.DataChannel do
  use ElixirProjectWeb, :channel

  @impl true
  def join("data:lobby", _payload, socket) do
    {:ok, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  @impl true
  def handle_in("new_msg", %{"sessionId" => sessionId}, socket) do
    broadcast!(socket, "new_msg", %{sessionId: sessionId})
    {:reply, {:ok, sessionId}, socket}
  end
end
