defimpl Poison.Encoder, for: TaskModel do
  def encode(message, options) do
    map = message
          |> Map.from_struct
          |> Map.drop([:__meta__, :__struct__])
    Poison.Encoder.Map.encode(map, options)
  end
end
