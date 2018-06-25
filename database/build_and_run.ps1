docker image build -t database:dev .
docker run -p 5432:5432 database:dev
