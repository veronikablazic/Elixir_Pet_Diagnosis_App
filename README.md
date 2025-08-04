# Pet Diagnosis App

This simple application leverages AI to collect a sick pet's simptom information and delivers a possible diagnosis. The dashboard showcases the results and displays trends. 
In order for it to properly work, a Google Gemini API key needs to be generated. To use it, you can create a config/secret.exs file with the following:

`import Config`
`config :elixir_project,
  gemini_api_key: "MY_SECRET_GEMINI_API_KEY"`

To start your Phoenix server:

  * Run `mix setup` to install and setup dependencies
  * Start Phoenix endpoint with `mix phx.server` or inside IEx with `iex -S mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

This project uses React for frontend developement. The code is inside /client folder. To access the client developement environment, run `npm run dev` inside the client directory.
Now you can visit [`localhost:5173`](http://localhost:5173) from your browser.

To connect the frontent with the backend, the built frontend needs to be copied into /priv/static/webapp. To achieve this, run `npm run build` inside the client directory followed by `mix webapp` from the root of the project. After the phoenix server is started, the compiled front-end will be available on [`localhost:4000/app`](http://localhost:4000/app).
