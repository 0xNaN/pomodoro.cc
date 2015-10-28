defmodule ApiV2.Supervisor do
  use Supervisor

  def start_link do
    Supervisor.start_link(__MODULE__, [])
  end

  def init(_) do
    IO.puts "-- Supervisor started"
    children = [
      worker(ApiV2.Worker,[])
    ]
    supervise(children, strategy: :one_for_one)
  end
end
