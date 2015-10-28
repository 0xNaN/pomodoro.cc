defmodule ApiV2.Mixfile do
  use Mix.Project

  def project do
    [app: :api_v2,
     version: "0.0.1",
     elixir: "~> 1.0",
     build_embedded: Mix.env == :prod,
     start_permanent: Mix.env == :prod,
     deps: deps]
  end

  def application do
    [
      applications: [:logger, :cowboy, :plug],
      mod: {ApiV2, []},
    ]
  end

  defp deps do
    [
      {:cowboy, "~> 1.0.3"},
      {:plug, "~> 1.0.2"},
      {:poison, "~> 1.5"},
    ]
  end
end
