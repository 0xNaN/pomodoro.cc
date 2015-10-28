defmodule ApiV2.Router do
  use Plug.Router

  plug Plug.Logger
  if Mix.env == :dev do
    use Plug.Debugger
  end


  plug :match
  plug :dispatch

  get "/tasks" do
    # send_resp(conn, 200, Poison.encode!([]))
    tasks = ApiV2.Repo.all_tasks
    send_resp(conn, 200, Poison.encode!(tasks))
  end

  match _ do
    send_resp(conn, 404, "this is a hole in the system")
  end
end
