curl -LO https://raw.githubusercontent.com/ToolJet/ToolJet/main/deploy/docker/try-tooljet/docker-compose.yaml
mkdir postgres_data
curl -LO https://raw.githubusercontent.com/ToolJet/ToolJet/main/deploy/docker/try-tooljet/.env.example
mv .env.example .env
