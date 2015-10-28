FROM asaaki/elixir-pure-alpine

ADD mix.exs /app/mix.exs
WORKDIR /app
RUN mix deps.get
RUN mix local.hex
RUN mix compile
ADD . /app

EXPOSE 4000

CMD ["mix","run","--no-halt"]
