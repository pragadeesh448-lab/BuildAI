FROM python:3.11-slim

# Prevent Python from writing .pyc files and buffering stdout
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PORT=8080

WORKDIR /app

# Copy all project files
COPY . /app

# Ensure uploads and data directories exist
RUN mkdir -p /app/data/uploads

EXPOSE 8080

# Start BuildBuy AI Commercial Server
CMD ["python", "-u", "server.py"]
