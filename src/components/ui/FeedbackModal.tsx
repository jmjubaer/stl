"use client";
import { useState, useTransition } from "react";
import { Modal } from "antd";
import { useForm, SubmitHandler } from "react-hook-form";
// import { sendFeedback } from '@/src/services/FeedbackServices';
import ShowAlert from "@/src/utils/ShowAlert";
import { MdOutlineFeedback } from "react-icons/md";
import { TiPlus } from "react-icons/ti";
import { FaTimes } from "react-icons/fa";
import { sendFeedback } from "@/src/services/FeedbackServices";

type TFeedbackEntry = {
    type: string;
    message: string;
};

type TInputs = {
    name: string;
    email: string;
};

const feedbackTypes = [
    { value: "Bug Report", emoji: "🐛" },
    { value: "Feature Request", emoji: "✨" },
    { value: "General Feedback", emoji: "💬" },
    { value: "Other", emoji: "📝" },
];

const defaultEntry: TFeedbackEntry = {
    type: "General Feedback",
    message: "",
};

const FeedbackModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [entries, setEntries] = useState<TFeedbackEntry[]>([
        { ...defaultEntry },
    ]);
    const [entryErrors, setEntryErrors] = useState<{ message?: string }[]>([
        {},
    ]);

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TInputs>();

    const handleCancel = () => {
        setIsOpen(false);
        reset();
        setEntries([{ ...defaultEntry }]);
        setEntryErrors([{}]);
    };

    // Add new feedback entry
    const handleAddEntry = () => {
        setEntries((prev) => [...prev, { ...defaultEntry }]);
        setEntryErrors((prev) => [...prev, {}]);
    };

    // Remove feedback entry
    const handleRemoveEntry = (index: number) => {
        setEntries((prev) => prev.filter((_, i) => i !== index));
        setEntryErrors((prev) => prev.filter((_, i) => i !== index));
    };

    // Update entry field
    const handleEntryChange = (
        index: number,
        field: keyof TFeedbackEntry,
        value: string,
    ) => {
        setEntries((prev) =>
            prev.map((entry, i) =>
                i === index ? { ...entry, [field]: value } : entry,
            ),
        );
        // Clear error on change
        if (field === "message") {
            setEntryErrors((prev) =>
                prev.map((err, i) => (i === index ? {} : err)),
            );
        }
    };

    // Validate entries
    const validateEntries = () => {
        const newErrors = entries.map((entry) => {
            if (!entry.message || entry.message.trim().length < 10) {
                return { message: "Message must be at least 10 characters" };
            }
            return {};
        });
        setEntryErrors(newErrors);
        return newErrors.every((err) => !err.message);
    };

    const handleSendFeedback: SubmitHandler<TInputs> = (data) => {
        if (!validateEntries()) return;
        startTransition(async () => {
            const res = await sendFeedback({
                name: data.name,
                email: data.email,
                feedbacks: entries,
            });
            console.log(res);
            if (res?.success) {
                ShowAlert(
                    "Thank You!",
                    "success",
                    "Your feedback has been sent successfully.",
                );
                handleCancel();
            } else {
                ShowAlert(
                    "Error",
                    "error",
                    res?.message || "Failed to send feedback",
                );
            }
        });
    };

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className='flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-text/20 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 text-sm font-medium cursor-pointer'>
                <MdOutlineFeedback className='text-lg' />
                <span className='hidden sm:inline'>Feedback</span>
            </button>

            <Modal
                open={isOpen}
                onCancel={handleCancel}
                footer={false}
                width={500}>
                <div className='py-2'>
                    {/* Header */}
                    <div className='text-center mb-6'>
                        <div className='text-4xl mb-2'>💬</div>
                        <h2 className='text-2xl font-bold'>Send Feedback</h2>
                        <p className='text-gray-500 text-sm mt-1'>
                            Help us improve STL — your feedback matters!
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(handleSendFeedback)}>
                        {/* Name + Email — only once */}
                        <div className='border border-text/20 rounded-2xl p-4 mb-4'>
                            {/* Name */}
                            <div className='mb-3'>
                                <label className='block mb-1.5 font-medium text-text/80 text-sm'>
                                    Name :
                                </label>
                                <input
                                    {...register("name", {
                                        required: "Name is required",
                                    })}
                                    type='text'
                                    placeholder='Your name'
                                    className={`border w-full px-4 py-2 rounded-xl outline-0 text-sm ${
                                        errors.name
                                            ? "border-red-500"
                                            : "border-text/30"
                                    }`}
                                />
                                {errors.name && (
                                    <span className='text-red-500 text-xs mt-1 block'>
                                        {errors.name.message}
                                    </span>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className='block mb-1.5 font-medium text-text/80 text-sm'>
                                    Email :
                                </label>
                                <input
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "Invalid email",
                                        },
                                    })}
                                    type='email'
                                    placeholder='your@email.com'
                                    className={`border w-full px-4 py-2 rounded-xl outline-0 text-sm ${
                                        errors.email
                                            ? "border-red-500"
                                            : "border-text/30"
                                    }`}
                                />
                                {errors.email && (
                                    <span className='text-red-500 text-xs mt-1 block'>
                                        {errors.email.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Dynamic Feedback Entries */}
                        <div className='space-y-3 max-h-72 overflow-y-auto pr-1'>
                            {entries.map((entry, index) => (
                                <div
                                    key={index}
                                    className='border border-text/20 rounded-2xl p-4 relative'>
                                    {/* Remove button — only show if more than 1 entry */}
                                    {entries.length > 1 && (
                                        <button
                                            type='button'
                                            onClick={() =>
                                                handleRemoveEntry(index)
                                            }
                                            className='absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors'>
                                            <FaTimes className='text-sm' />
                                        </button>
                                    )}

                                    {/* Entry number */}
                                    <p className='text-xs text-gray-400 font-medium mb-3'>
                                        Feedback #{index + 1}
                                    </p>

                                    {/* Type Select */}
                                    <div className='mb-3'>
                                        <label className='block mb-1.5 font-medium text-text/80 text-sm'>
                                            Type :
                                        </label>
                                        <select
                                            value={entry.type}
                                            onChange={(e) =>
                                                handleEntryChange(
                                                    index,
                                                    "type",
                                                    e.target.value,
                                                )
                                            }
                                            className='border border-text/30 w-full px-4 py-2 rounded-xl outline-0 text-sm bg-white cursor-pointer'>
                                            {feedbackTypes.map((t) => (
                                                <option
                                                    key={t.value}
                                                    value={t.value}>
                                                    {t.emoji} {t.value}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className='block mb-1.5 font-medium text-text/80 text-sm'>
                                            Message :
                                        </label>
                                        <textarea
                                            value={entry.message}
                                            onChange={(e) =>
                                                handleEntryChange(
                                                    index,
                                                    "message",
                                                    e.target.value,
                                                )
                                            }
                                            rows={3}
                                            placeholder='Tell us what you think...'
                                            className={`border w-full px-4 py-2 rounded-xl outline-0 resize-none text-sm ${
                                                entryErrors[index]?.message
                                                    ? "border-red-500"
                                                    : "border-text/30"
                                            }`}
                                        />
                                        {entryErrors[index]?.message && (
                                            <span className='text-red-500 text-xs mt-1 block'>
                                                {entryErrors[index].message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Add More Button */}
                        <button
                            type='button'
                            onClick={handleAddEntry}
                            className='mt-3 w-full border border-dashed border-primary text-primary rounded-2xl py-2 flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors text-sm font-medium'>
                            <TiPlus className='text-lg' />
                            Add Another Feedback
                        </button>

                        {/* Action Buttons */}
                        <div className='flex justify-end gap-3 mt-5'>
                            <button
                                type='button'
                                onClick={handleCancel}
                                className='border hover:bg-gray-100 rounded-xl px-5 py-2 cursor-pointer transition-colors'>
                                Cancel
                            </button>
                            <button
                                type='submit'
                                disabled={isPending}
                                className='border bg-primary text-white hover:opacity-90 rounded-xl px-5 py-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed transition-all'>
                                {isPending ? "Sending..." : `Send Feedback 🚀`}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default FeedbackModal;
