defmodule Task do
  use Ecto.Model

  schema "task" do
    field :text,      :string
    field :user_id,   :integer
    field :completed, :boolean
    timestamps
  end
end
