# AI-TextSpeech

# Python Example for Text-to-Speech SDK

Welcome to the Python Text-to-Speech SDK! This powerful tool allows you to convert text into speech, upload the generated audio file to Amazon S3, and retrieve a signed URL for easy sharing, whether via text message or embedded on a website.

## Features

- Text-to-Speech Conversion: Convert any text into natural-sounding speech.
- S3 Integration: Automatically upload speech files to your AWS S3 bucket.
- Shareable Links: Generate signed URLs for your audio files for easy sharing.

## Getting Started

### Prerequisites

Make sure you have the following installed before you begin:

- Python 3.x
- An AWS account with access to S3
- AWS CLI (optional, for configuring AWS credentials)

### Installation

<!--  -->

```bash
pyenv local 3.11

```

<!-- Check python version  -->

```bash
pyenv exec python -v

```

<!-- Create a virtual environment -->

```bash
pyenv exec python -m venv .venv
python3 -m venv .venv

```

<!--  To activate virtual environment-->

```bash
source .venv/bin/activate

```

<!-- Install dependencies -->

```bash
pip install -r requirements.txt
pip install -r requirements-dev.txt

```

<!-- Working in dev mode -->

```bash
    python3 -m pip install -e .
    python3 -m pip install -e . --no-deps
```

<!-- Run Your Application -->

```bash
    uvicorn app.main:app --reload
```

<!-- Install and activate the dev environment: -->

```bash
    hatch env create dev
    hatch shell dev
```

 <!-- Verify Installation -->

```bash
    pip freeze
```

<!-- To run test -->

```bash
    pytest
    pytest -k <test_name>
    pytest --fixtures
    pytest --fixtures-per-test
```

### AWS Configuration

Before using the SDK, configure your AWS credentials to enable access to S3:

## Usage

For detailed usage instructions and code examples, please refer to [this guide](https://elevenlabs.io/docs/developer-guides/how-to-use-tts-with-streaming).

## Contributing

We welcome contributions to this project! Please refer to our contribution guidelines for more information on how you can contribute.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

If you have any questions or comments, feel free to reach out.
