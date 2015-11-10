defmodule ApiV2.Router do
  use Plug.Router

  @api_url Application.get_env(:api_v2, :api_url)

  plug Plug.Logger
  if Mix.env == :dev do
    use Plug.Debugger
  end


  plug :match
  plug :dispatch

  get "/api/tasks" do
    send_resp(conn, 200, Poison.encode!([]))
  end

  forward "/", to: FallbackProxy
end
