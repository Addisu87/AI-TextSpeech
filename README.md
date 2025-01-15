# AI Text-to-Speech SDK

Welcome to the AI Text-to-Speech SDK, a versatile tool that enables seamless text-to-speech conversion, automatic uploading of generated audio to Amazon S3, and easy sharing through signed URLs. Whether you're building an interactive voice application, enhancing your website, or sharing content through messaging, this SDK makes it simple and efficient.

---

## 🚀 Key Features

### 1. **Text-to-Speech Conversion**
   - Instantly transform any text into high-quality, natural-sounding speech.
   - Supports multiple languages and voices, ensuring a personalized user experience.

### 2. **S3 Integration**
   - Automatically upload the generated audio files to your Amazon S3 bucket.
   - Manage and organize your audio files effortlessly in your S3 storage.

### 3. **Shareable Links**
   - Generate signed URLs for your audio files, which can be easily shared through text messages, emails, or embedded into websites.
   - Use these URLs to integrate speech audio directly into your digital products.

---

## 🏁 Getting Started

### Prerequisites

Before getting started, ensure you have the following:

- **Python 3.x**: Install Python from [official site](https://www.python.org/downloads/).
- **AWS Account**: Access to S3 for file storage.
- **AWS CLI**: (Optional) Configure AWS credentials locally for easier access.

---

### 🔧 Installation

#### 1. **Set Up Virtual Environment**
First, create a virtual environment to isolate your dependencies.

```bash
# Using pyenv (optional)
pyenv exec python -m venv .venv

# Or using standard Python
python3 -m venv .venv
```

#### 2. **Activate Virtual Environment**
Activate the virtual environment to begin installing packages.

```bash
source .venv/bin/activate
```

#### 3. **Install Dependencies**
Install the required dependencies for running the SDK.

```bash
# Install basic dependencies
pip install -r requirements.txt

# Install development dependencies
pip install -r requirements-dev.txt
```

---

### 🏗️ Run Your Application

Once you've set up the environment and dependencies, run the application with:

```bash
uvicorn main:app --reload
```

#### 4. **Development Environment (Optional)**

If you'd like to work within a development environment, set up Hatch for environment management:

```bash
# Create dev environment
hatch env create dev

# Activate dev environment
hatch shell dev
```

---

### 📦 AWS Configuration

To use the Text-to-Speech SDK, you need to configure your AWS credentials for seamless interaction with S3.

1. **AWS CLI Setup (Optional)**:
   ```bash
   aws configure
   ```

2. **Set Up AWS Credentials**:
   Follow the AWS documentation to configure IAM roles and permissions for S3 access.

---

## 💻 Usage

For detailed usage instructions, refer to the full [guide](https://elevenlabs.io/docs/developer-guides/how-to-use-tts-with-streaming). This guide includes:

- Example code snippets to demonstrate text-to-speech conversion.
- Instructions on how to upload the generated audio to Amazon S3.
- A step-by-step process on generating signed URLs for sharing audio.

---

## 🤝 Contributing

We encourage contributions to this project! Whether you're fixing bugs, enhancing features, or optimizing performance, your help is appreciated. Please check out the [contributing guidelines](CONTRIBUTING.md) for more information.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

Got questions or need assistance? Feel free to reach out to our support team at [support@yourcompany.com]. We’re here to help you make the most out of the Text-to-Speech SDK!

--- 

### Let your app talk with the power of AI!
