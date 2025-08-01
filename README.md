# Pet Diagnosis App

This simple application leverages AI to collect sick pet simptom information and delivers a possible diagnosis. The dashboard showcases the results and displays trends. 
In order for it to properly work, a Google Gemini API key needs to be generated and plugged into the `api_key` variable.

To start your Phoenix server:

  * Run `mix setup` to install and setup dependencies
  * Start Phoenix endpoint with `mix phx.server` or inside IEx with `iex -S mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.
Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

This project uses React for front-end developement. The code is inside /client folder. To access the client developement environment run `npm run dev` inside the client directory.
Now you can visit [`localhost:5173`](http://localhost:5173) from your browser.

To connect the two, the build front-end needs to be copied into /priv/static/webapp. To achieve this, run `npm run build` inside the client directory followed by `mix webapp` from the root of the project.
