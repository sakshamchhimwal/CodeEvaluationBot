FROM python:3.9

# Set the working directory
WORKDIR /app

# Install chromadb
RUN pip install chromadb

# Expose the port used by the application
EXPOSE 8000

# Specify the default command to run when the container starts
CMD ["chroma", "run", "--path", "/my_path", "--host", "0.0.0.0", "--port", "8000"]
