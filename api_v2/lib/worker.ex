defmodule ApiV2.Worker do
  def start_link do
    Plug.Adapters.Cowboy.http(ApiV2.Router, [], port: 6000)
  end
end
