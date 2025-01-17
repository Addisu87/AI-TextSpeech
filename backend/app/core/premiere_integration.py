import os
import subprocess


def import_audio_to_premiere(
    audio_path: str, character_name: str, sync_timestamp: float = 0.0
):
    """
    Automate Adobe Premiere to import audio and add it to the timeline for dubbing.

    Args:
        audio_path (str): Path to the audio file.
        character_name (str): Character name for identification.
        sync_timestamp (float): Timestamp in seconds where the audio should start in the timeline.
    """
    # Path to the ExtendScript file
    jsx_script_path = "import_audio.jsx"

    if not os.path.exists(audio_path):
        raise FileNotFoundError(f"Audio file not found at {audio_path}")

    if not os.path.exists(jsx_script_path):
        raise FileNotFoundError(f"ExtendScript file not found at {jsx_script_path}")

    # Replace placeholders in JSX script with dynamic values
    with open(jsx_script_path, "r") as jsx_file:
        jsx_content = jsx_file.read()

    jsx_content = jsx_content.replace("/path/to/audio.mp3", audio_path)
    jsx_content = jsx_content.replace("Character Name", character_name)
    jsx_content = jsx_content.replace("SYNC_TIMESTAMP", str(sync_timestamp))

    # Write the updated JSX script to a temporary file
    temp_jsx_path = "temp_import_audio.jsx"
    with open(temp_jsx_path, "w") as temp_jsx_file:
        temp_jsx_file.write(jsx_content)

    # Use subprocess to call the ExtendScript Toolkit
    try:
        subprocess.run(
            [
                "osascript",
                "-e",
                f'do script "{temp_jsx_path}" in application "Adobe Premiere Pro"',
            ],
            check=True,
        )
        print(
            f"Audio file '{audio_path}' successfully imported into Premiere at timestamp {sync_timestamp}."
        )
    except subprocess.CalledProcessError as e:
        raise RuntimeError(f"Failed to import audio to Premiere: {str(e)}")
    finally:
        # Clean up temporary files
        if os.path.exists(temp_jsx_path):
            os.remove(temp_jsx_path)
