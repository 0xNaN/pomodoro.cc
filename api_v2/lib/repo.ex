defmodule ApiV2.Repo do
  use Ecto.Repo, otp_app: :api_v2
  import Ecto.Query

  def all_tasks do
    query = from m in TaskModel,
         select: m
    all(query)
  end
end
