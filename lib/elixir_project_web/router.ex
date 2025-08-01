defmodule ElixirProjectWeb.Router do
  use ElixirProjectWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {ElixirProjectWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", ElixirProjectWeb do
    pipe_through :browser

    get "/", PageController, :home
  end

  scope "/api", ElixirProjectWeb do
    pipe_through :api
    get "/diagnosis", DiagnosisController, :get_all
    post "/diagnosis", DiagnosisController, :create
  end

  # Other scopes may use custom stacks.
  scope "/app", ElixirProjectWeb do
    get "/", WebappController, :index
    get "/*path", WebappController, :index
  end

  # Enable LiveDashboard and Swoosh mailbox preview in development
  if Application.compile_env(:elixir_project, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through :browser

      live_dashboard "/dashboard", metrics: ElixirProjectWeb.Telemetry
      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end
end
