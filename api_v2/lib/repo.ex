defmodule ApiV2.Repo do
  use Ecto.Repo, otp_app: :hello_ecto
  import Ecto.Query

  def all_tasks do
    query = from m in Task,
         select: m
    all(query)
  end
end
