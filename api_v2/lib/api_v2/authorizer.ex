defmodule ApiV2.Authorizer do
  @authorizer_url Application.get_env(:api_v2, :authorizer_url) <> "/auth/info"

  def authorize(cookie) do
    case HTTPoison.get!(@authorizer_url, [{"cookie", cookie}]) do
      %HTTPoison.Response{status_code: 200, body: _, headers: _} -> true
      %HTTPoison.Response{status_code: 401, body: _, headers: _} -> false
    end
  end
end