defmodule Mix.Tasks.Webapp do
  @moduledoc """
     React frontend compilation and bundling for production.
  """
  use Mix.Task
  require Logger
  # Path for the frontend static assets that are being served
  # from our Phoenix router when accessing /app/* for the first time
  @public_path "./priv/static/webapp"

  # @shortdoc "Compile and bundle React client for production"
  def run(_) do
    # cd ./client
    # npm install
    # npm run build
    client_path = Path.join(File.cwd!(), "client")
    public_path = @public_path # Assuming @public_path is defined elsewhere
    File.rm_rf!(public_path)
    File.cp_r!(Path.join(client_path, "dist"), public_path)
    Logger.info("⚛️  - React client ready.")
  end
end
