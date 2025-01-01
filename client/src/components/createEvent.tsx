import React, { useState } from "react";

interface EventData {
    title: string;
    startDate: string;
    endDate: string;
}

interface EventCreatorProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (event: EventData) => void;
    currentSelectedData: string
    selectedDateLocation: any
}

const isDateValid = (endDate: string): boolean => {
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];

    const end = new Date(endDate);

    // Validate
    return end >= today;
};

const EventCreator: React.FC<EventCreatorProps> = ({ isOpen, onClose, onSave, currentSelectedData, selectedDateLocation }) => {
    const [eventData, setEventData] = useState<EventData>({
        title: "",
        startDate: currentSelectedData,
        endDate: currentSelectedData,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEventData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        if (eventData.title && eventData.startDate && eventData.endDate) {
            onSave(eventData);
            setEventData({ title: "", startDate: "", endDate: "" });
            onClose();
        } else {
            alert("Please fill all fields. Or Choose Date From Today");
        }
    };

    if (!isOpen) return null;
    console.log(selectedDateLocation)
    return (
        <div
            style={{ ...selectedDateLocation }}
            className={`absolute bg-black bg-opacity-50 flex items-center justify-center z-50`}
            onClick={onClose}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-96"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-semibold mb-4">Create New Event</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Event Title</label>
                    <input
                        type="text"
                        name="title"
                        value={eventData.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter event title"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Start Date</label>
                    <input
                        type="date"
                        name="startDate"
                        value={eventData.startDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">End Date</label>
                    <input
                        type="date"
                        name="endDate"
                        value={eventData.endDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className={`px-4 py-2 text-white rounded-lg bg-blue-500`}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventCreator;
