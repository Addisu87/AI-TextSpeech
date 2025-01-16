'use client';

import {
	useEffect,
	useRef,
	useState,
} from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';

const AudioGenerator = () => {
	const [characterName, setCharacterName] =
		useState('');
	const [sampleAudio, setSampleAudio] =
		useState<File | null>(null);
	const [text, setText] = useState('');
	const [audioUrl, setAudioUrl] = useState('');
	const [uploadProgress, setUploadProgress] =
		useState(0);
	const [isProcessing, setIsProcessing] =
		useState(false);
	const audioRef = useRef<HTMLAudioElement>(null);

	const createVoiceClone = async () => {
		if (!characterName || !sampleAudio) {
			alert(
				'Please provide both character name and sample audio.',
			);
			return;
		}

		const formData = new FormData();
		formData.append(
			'character_name',
			characterName,
		);
		formData.append('sample_audio', sampleAudio);

		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/create-voice-clone`,
				formData,
			);
			return response.data;
		} catch (error) {
			console.error(
				'Error creating voice clone:',
				error,
			);
		}
	};

	const addVoiceToBlock = async () => {
		try {
			setIsProcessing(true);
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/add-voice-to-block`,
				{ character_name: characterName, text },
				{
					onUploadProgress: (progressEvent) => {
						const progress = Math.round(
							(progressEvent.loaded /
								(progressEvent.total || 1)) *
								100,
						);
						setUploadProgress(progress);
					},
				},
			);
			return response.data;
		} catch (error) {
			console.error(
				'Error adding voice to block:',
				error,
			);
		} finally {
			setIsProcessing(false);
			setUploadProgress(0);
		}
	};

	const handleAudioEnd = () => {
		setAudioUrl('');
	};

	return (
		<section className='bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 h-screen flex justify-center items-center'>
			<div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-lg text-center'>
				<h1 className='text-3xl font-extrabold text-gray-800 mb-4'>
					AI Voice Generator
				</h1>

				<div className='space-y-6'>
					<Input
						placeholder='Character Name'
						value={characterName}
						onChange={(e) =>
							setCharacterName(e.target.value)
						}
					/>
					<input
						type='file'
						accept='audio/*'
						onChange={(e) =>
							setSampleAudio(
								e.target.files?.[0] || null,
							)
						}
						className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600'
					/>
					<Button onClick={createVoiceClone}>
						Create Voice Clone
					</Button>

					<Textarea
						placeholder='Enter text to convert to speech'
						value={text}
						onChange={(e) =>
							setText(e.target.value)
						}
					/>
					<Button
						onClick={addVoiceToBlock}
						disabled={isProcessing}
						variant='default'
					>
						{isProcessing
							? 'Processing...'
							: 'Generate Audio'}
					</Button>

					{uploadProgress > 0 && (
						<Progress
							value={uploadProgress}
							className='w-full'
						/>
					)}
				</div>

				{audioUrl && (
					<audio
						ref={audioRef}
						src={audioUrl}
						controls
						onEnded={handleAudioEnd}
					>
						Your browser does not support the
						audio element.
					</audio>
				)}
			</div>
		</section>
	);
};

export default AudioGenerator;
