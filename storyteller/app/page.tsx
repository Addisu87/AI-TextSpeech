'use client';

import { useRef, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';

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
			(file) => file !== undefined,
			'Sample audio is required.',
		),
});

const addVoiceToBlockSchema = z.object({
	characterName: z
		.string()
		.nonempty('Character name is required.'),
	text: z.string().nonempty('Text is required.'),
});

const AudioGenerator = () => {
	const [audioUrl, setAudioUrl] = useState('');
	const [uploadProgress, setUploadProgress] =
		useState(0);
	const [isProcessing, setIsProcessing] =
		useState(false);
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

	console.log(process.env.NEXT_PUBLIC_API_URL);

	const createVoiceClone = async (data: {
		character_name: string;
		sample_audio: File;
	}) => {
		const { character_name, sample_audio } = data;

		const formData = new FormData();
		formData.append(
			'character_name',
			character_name,
		);
		formData.append('sample_audio', sample_audio);

		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/create-voice-clone`,
				formData,
			);

			return response.data;
			createVoiceForm.reset();
		} catch (error) {
			console.error(
				'Error creating voice clone:',
				error,
			);
		}
	};

	const addVoiceToBlock = async (data: {
		character_name: string;
		text: string;
	}) => {
		const { character_name, text } = data;

		try {
			setIsProcessing(true);
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/add-voice-to-block`,
				{ character_name, text },

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
			addVoiceForm.reset();
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

					<input
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

					<Button
						type='submit'
						disabled={isProcessing}
					>
						{isProcessing
							? 'Processing...'
							: 'Generate Audio'}
					</Button>
				</form>

				{uploadProgress > 0 && (
					<Progress
						value={uploadProgress}
						className='w-full my-4'
					/>
				)}

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
