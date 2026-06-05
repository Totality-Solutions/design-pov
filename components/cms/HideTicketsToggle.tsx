"use client";

import { useState, useEffect } from "react";

export default function HideTicketsToggle() {
  const [hideTickets, setHideTickets] = useState(false);
  const [ticketLabel, setTicketLabel] = useState("Buy Tickets");
  const [ticketLink, setTicketLink] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch("/api/cms/global-settings");


        if (res.ok) {
          const data = await res.json();

          setHideTickets(!!data.hideTickets);
          setTicketLabel(data.ticketButtonLabel || "Buy Tickets");
          setTicketLink(data.ticketButtonLink || "");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStatus();

  }, []);

  async function saveSettings(
    updates: Record<string, any>
  ) {
    setIsSaving(true);

    try {
      const res = await fetch(
        "/api/cms/global-settings",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updates),
        }
      );

      if (!res.ok) throw new Error();
    } catch (err) {
      console.error(err);
      alert("Failed to save changes");
    } finally {
      setIsSaving(false);
    }


  }

  async function handleToggle(value: boolean) {
    setHideTickets(value);


    await saveSettings({
      hideTickets: value,
    });


  }

  async function handleSaveButtonConfig() {
    await saveSettings({
      ticketButtonLabel: ticketLabel,
      ticketButtonLink: ticketLink,
    });
  }

  if (isLoading) {
    return (<div className="p-4 text-sm">
      Loading... </div>
    );
  }

  return (

    <div className="bg-white border border-black/10 p-5 w-full max-w-md shadow-sm space-y-6">

      <div>
        <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-3 font-semibold">
          Ticket Visibility
        </p>

        <label className="inline-flex items-center gap-3 justify-between w-full">
          <span className="text-sm font-medium">
            {hideTickets
              ? "Buttons Hidden"
              : "Buttons Visible"}
          </span>

          <input
            type="checkbox"
            checked={hideTickets}
            onChange={(e) =>
              handleToggle(e.target.checked)
            }
          />
        </label>
      </div>

      <div className="border-t pt-5">
        <div className="space-y-6">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-semibold">
            Ticket Button Label
          </p>
          <input
            type="text"
            value={ticketLabel}
            onChange={(e) =>
              setTicketLabel(e.target.value)
            }
            placeholder="Button Label"
            className="w-full border p-3 mb-2"
          />
 
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-semibold">
            Ticket Button Link
          </p>
          <input
            type="url"
            value={ticketLink}
            onChange={(e) =>
              setTicketLink(e.target.value)
            }
            placeholder="Button URL"
            className="w-full border p-3"
          />

          <button
            onClick={handleSaveButtonConfig}
            disabled={isSaving}
            className="bg-black text-white px-4 py-2 mt-2"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>

  );
}
