"use client";
import React, { useEffect, useState } from "react";

import {
  FiMail,
  FiCheck,
  FiArchive,
  FiCornerUpLeft,
  FiFilter,
  FiTrash2,
} from "react-icons/fi";
import { RiMailOpenLine, RiMailUnreadLine } from "react-icons/ri";
import { BsReply, BsReplyAll } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import MarkdownRenderer from "../../../components/MarkdownRender";
import MessageModal from "../../../components/dashboard/MessageModal";
import AlertModal from "../../../components/dashboard/AlertModal";

export default function MessagesDashboard() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  useEffect(() => {
    fetchMessages();
  }, [filter]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/messages?filter=${filter}`);
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
      showAlert(
        "Error",
        "Failed to fetch messages. Please try again later.",
        () => {}
      );
    } finally {
      setLoading(false);
    }
  };

  const updateMessageStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      fetchMessages();
      showAlert("Success", `Message marked as ${status}`, () => {});
    } catch (error) {
      console.error("Error updating status:", error);
      showAlert("Error", "Failed to update message status", () => {});
    }
  };

  const deleteMessage = async (id) => {
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete message");

      fetchMessages();
      showAlert("Success", "Message deleted successfully", () => {});
    } catch (error) {
      console.error("Error deleting message:", error);
      showAlert("Error", "Failed to delete message", () => {});
    }
  };

  const sendReply = async (id, reply) => {
    try {
      const res = await fetch(`/api/messages/reply/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply }),
      });

      if (!res.ok) throw new Error("Failed to send reply");

      fetchMessages();
      setSelectedMessage(null);
      showAlert("Success", "Reply sent successfully", () => {});
    } catch (error) {
      console.error("Error sending reply:", error);
      showAlert("Error", "Failed to send reply", () => {});
    }
  };

  const showAlert = (title, message, onConfirm) => {
    setAlertModal({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        onConfirm();
        setAlertModal((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const confirmDelete = (id) => {
    showAlert(
      "Delete Message",
      "Are you sure you want to delete this message? This action cannot be undone.",
      () => deleteMessage(id)
    );
  };

  const confirmArchive = (id) => {
    showAlert(
      "Archive Message",
      "Are you sure you want to archive this message?",
      () => updateMessageStatus(id, "archived")
    );
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "unread":
        return <RiMailUnreadLine className="text-blue-400" />;
      case "read":
        return <RiMailOpenLine className="text-green-400" />;
      case "replied":
        return <BsReply className="text-purple-400" />;
      case "archived":
        return <FiArchive className="text-gray-400" />;
      default:
        return <FiMail className="text-gray-400" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <div className="bg-gray-900 min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-white"
          >
            Customer Messages
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FiFilter className="text-gray-300" />
              <span className="text-gray-200 capitalize">{filter}</span>
            </button>

            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-10 border border-gray-700"
                >
                  <div className="py-1">
                    {["all", "unread", "read", "replied", "archived"].map(
                      (f) => (
                        <button
                          key={f}
                          onClick={() => {
                            setFilter(f);
                            setIsFilterOpen(false);
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm capitalize ${
                            filter === f
                              ? "bg-purple-600 text-white"
                              : "text-gray-300 hover:bg-gray-700"
                          }`}
                        >
                          {f}
                        </button>
                      )
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-gray-800 h-24 rounded-lg animate-pulse"
              ></motion.div>
            ))}
          </div>
        ) : messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 rounded-lg p-8 text-center"
          >
            <div className="mx-auto w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <FiMail className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-white mb-1">
              No messages found
            </h3>
            <p className="text-gray-400">
              {filter === "all"
                ? "You don't have any messages yet."
                : `No ${filter} messages found.`}
            </p>
          </motion.div>
        ) : (
          <AnimatePresence>
            <div className="space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message._id}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className={`p-5 rounded-lg border ${
                    message.status === "unread"
                      ? "border-purple-500 bg-gray-800"
                      : "border-gray-700 bg-gray-800/50"
                  } hover:shadow-lg transition-all`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-white truncate">
                          {message.name}
                        </h3>
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          {getStatusIcon(message.status)}
                          {message.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 truncate mb-3">
                        {message.email}
                      </p>
                      <div className="bg-gray-700/50 p-3 rounded mb-3">
                        <p className="text-gray-300 whitespace-pre-line">
                          {message.message}
                        </p>
                      </div>

                      {message.reply && (
                        <div className="mt-4 border-t border-gray-700 pt-4">
                          <div className="flex items-center gap-2 text-sm text-purple-400 mb-2">
                            <BsReplyAll />
                            <span>Your Reply</span>
                          </div>
                          <MarkdownRenderer content={message.reply} />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedMessage(message)}
                          className="p-2 text-gray-400 hover:text-purple-400 hover:bg-gray-700 rounded-full transition-colors"
                          title="View and reply"
                        >
                          <FiCornerUpLeft size={18} />
                        </button>
                        {message.status === "unread" && (
                          <button
                            onClick={() =>
                              updateMessageStatus(message._id, "read")
                            }
                            className="p-2 text-gray-400 hover:text-green-400 hover:bg-gray-700 rounded-full transition-colors"
                            title="Mark as read"
                          >
                            <FiCheck size={18} />
                          </button>
                        )}
                        <button
                          onClick={() => confirmArchive(message._id)}
                          className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-gray-700 rounded-full transition-colors"
                          title="Archive"
                        >
                          <FiArchive size={18} />
                        </button>
                        <button
                          onClick={() => confirmDelete(message._id)}
                          className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-full transition-colors"
                          title="Delete"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatDate(message.createdAt)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>

      <AnimatePresence>
        {selectedMessage && (
          <MessageModal
            message={selectedMessage}
            onClose={() => setSelectedMessage(null)}
            onSendReply={sendReply}
          />
        )}
      </AnimatePresence>

      <AlertModal
        isOpen={alertModal.isOpen}
        title={alertModal.title}
        message={alertModal.message}
        onConfirm={alertModal.onConfirm}
        onClose={() => setAlertModal((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
