"use client";
import { useState } from "react";
import { FiX, FiSend } from "react-icons/fi";

export default function MessageModal({
  message,
  onClose,
  onSendReply,
}: {
  message: any;
  onClose: () => void;
  onSendReply: (id: string, reply: string) => void;
}) {
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await onSendReply(message._id, reply);
    setSending(false);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-white">Reply to Message</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <FiX size={24} />
            </button>
          </div>

          <div className="mb-6 p-4 bg-gray-700/50 rounded-lg">
            <div className="flex justify-between mb-2">
              <h3 className="font-medium text-white">{message.name}</h3>
              <span className="text-sm text-gray-400">
                {new Date(message.createdAt).toLocaleString()}
              </span>
            </div>
            <p className="text-gray-300 mb-2">{message.email}</p>
            <p className="text-gray-200 whitespace-pre-line">
              {message.message}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Your Reply</label>
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={6}
                required
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={sending || !reply.trim()}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 disabled:opacity-50 flex items-center gap-2"
              >
                {sending ? "Sending..." : "Send Reply"}
                <FiSend />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
