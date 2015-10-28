FROM asaaki/elixir-pure-alpine

ADD mix.exs /app/mix.exs
WORKDIR /app
RUN mix deps.get
RUN mix local.hex
RUN mix compile
ADD . /app

ENV MIX_ENV prod
EXPOSE 6000

CMD ["mix","run","--no-halt"]
