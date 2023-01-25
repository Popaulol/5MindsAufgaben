FROM mcr.microsoft.com/dotnet/sdk:6.0

RUN apt-get update
RUN apt-get install -y nodejs npm

WORKDIR /apps/IntermediateProcessCubeProjekt/frontend
COPY apps/IntermediateProcessCubeProjekt/frontend/package.json apps/IntermediateProcessCubeProjekt/frontend/package-lock.json ./
RUN npm ci

WORKDIR /
COPY ../../analyzers.ruleset .

WORKDIR /apps/IntermediateProcessCubeProjekt
COPY apps/IntermediateProcessCubeProjekt/IntermediateProcessCubeProjekt.csproj .
RUN dotnet restore
