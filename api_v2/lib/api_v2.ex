defmodule ApiV2 do
  use Application
  def start(_type, _args) do
    ApiV2.Supervisor.start_link
  end
end
