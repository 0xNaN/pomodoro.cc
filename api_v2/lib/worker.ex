defmodule ApiV2.Worker do
  def start_link do
    Plug.Adapters.Cowboy.http(ApiV2.Router, [])
  end
end
