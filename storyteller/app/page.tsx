'use client';

import { useRef, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Define Zod schema for form validation
const createVoiceCloneSchema = z.object({
	characterName: z
		.string()
		.nonempty('Character name is required.'),
	sampleAudio: z
		.instanceof(File)
		.refine(
			(file) => file.size > 0,
			'Sample audio is required.',
		),
});

const addVoiceToBlockSchema = z.object({
	characterName: z
		.string()
		.nonempty('Character name is required.'),
	text: z.string().nonempty('Text is required.'),
});

const HomePage = () => {
	const [audioUrl, setAudioUrl] = useState('');
	const audioRef = useRef<HTMLAudioElement>(null);

	const createVoiceForm = useForm({
		resolver: zodResolver(createVoiceCloneSchema),
		defaultValues: {
			character_name: '',
			sample_audio: undefined,
		},
	});

	const addVoiceForm = useForm({
		resolver: zodResolver(addVoiceToBlockSchema),
		defaultValues: {
			character_name: '',
			text: '',
		},
	});

	const apiUrl = process.env.NEXT_PUBLIC_API_URL;

	// Create Voice Clone
	const createVoiceClone = async (data: {
		characterName: string;
		sampleAudio: File;
	}) => {
		const { characterName, sampleAudio } = data;

		const formData = new FormData();
		formData.append(
			'character_name',
			characterName,
		);
		formData.append('sample_audio', sampleAudio);

		try {
			const response = await axios.post(
				`${apiUrl}/create-voice-clone`,
				formData,
			);
			createVoiceForm.reset();
			return response.data;
		} catch (error) {
			console.error(
				'Error creating voice clone:',
				error,
			);
			throw error;
		}
	};

	const addVoiceToBlock = async (data: {
		characterName: string;
		text: string;
	}) => {
		try {
			const response = await axios.post(
				`${apiUrl}/add-voice-to-block`,
				{
					character_name: data.characterName,
					text: data.text,
				},
			);
			addVoiceForm.reset();
			setAudioUrl(response.data.audio_url);
			return response.data;
		} catch (error) {
			console.error(
				'Error adding voice to block:',
				error,
			);
			throw error;
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

				{/* Create Voice Clone Form */}
				<form
					onSubmit={createVoiceForm.handleSubmit(
						createVoiceClone,
					)}
					className='space-y-6 mb-8'
				>
					<Input
						{...createVoiceForm.register(
							'characterName',
						)}
						placeholder='Character Name'
						className={
							createVoiceForm.formState.errors
								.characterName
								? 'border-red-500'
								: ''
						}
					/>
					{createVoiceForm.formState.errors
						.characterName && (
						<p className='text-red-500 text-sm'>
							{
								createVoiceForm.formState.errors
									.characterName.message
							}
						</p>
					)}

					<Input
						type='file'
						accept='audio/*'
						{...createVoiceForm.register(
							'sampleAudio',
						)}
						className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600'
					/>
					{createVoiceForm.formState.errors
						.sampleAudio && (
						<p className='text-red-500 text-sm'>
							{
								createVoiceForm.formState.errors
									.sampleAudio.message
							}
						</p>
					)}

					<Button type='submit'>
						Create Voice Clone
					</Button>
				</form>

				{/* Add Voice to Block Form */}
				<form
					onSubmit={addVoiceForm.handleSubmit(
						addVoiceToBlock,
					)}
					className='space-y-6'
				>
					<Input
						{...addVoiceForm.register(
							'characterName',
						)}
						placeholder='Character Name'
						className={
							addVoiceForm.formState.errors
								.characterName
								? 'border-red-500'
								: ''
						}
					/>
					{addVoiceForm.formState.errors
						.characterName && (
						<p className='text-red-500 text-sm'>
							{
								addVoiceForm.formState.errors
									.characterName.message
							}
						</p>
					)}

					<Textarea
						{...addVoiceForm.register('text')}
						placeholder='Enter text to convert to speech'
						className={
							addVoiceForm.formState.errors.text
								? 'border-red-500'
								: ''
						}
					/>
					{addVoiceForm.formState.errors.text && (
						<p className='text-red-500 text-sm'>
							{
								addVoiceForm.formState.errors.text
									.message
							}
						</p>
					)}

					<Button type='submit'>
						Generate Audio
					</Button>
				</form>

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

export default HomePage;
