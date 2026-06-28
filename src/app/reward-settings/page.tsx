"use client";

import { useEffect, useState } from "react";

import {
  getRewardSettings,
  updateRewardSettings,
} from "@/src/services/reward.service";

import { RewardSettings } from "@/src/types/reward";

export default function RewardSettingsPage() {
  const [settings, setSettings] =
    useState<RewardSettings | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data =
        await getRewardSettings();

      console.log("GET:", data);

      setSettings(data);
    } catch (err) {
      console.log(err);

      alert("Failed to load reward settings");
    } finally {
      setLoading(false);
    }
  };

  const save = async () => {
    try {
      if (!settings) return;

      setSaving(true);

      console.log(
        "PATCH DATA:",
        settings,
      );

      const res =
        await updateRewardSettings(
          settings,
        );

      console.log(
        "PATCH RESPONSE:",
        res,
      );

      alert(
        "Reward Settings Updated Successfully",
      );
    } catch (err: any) {
      console.log("PATCH ERROR:", err);

      console.log(
        "PATCH RESPONSE:",
        err?.response,
      );

      alert(
        err?.response?.data?.message ||
          err.message ||
          "Save Failed",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="p-6">
        No Reward Settings Found
      </div>
    );
  }

  return (
    <div className="max-w-4xl">

      <h1 className="text-3xl font-bold mb-8">
        Reward Settings
      </h1>

      <div className="grid grid-cols-2 gap-5">

        <div>
          <label className="block mb-2">
            Regular %
          </label>

          <input
            type="number"
            className="border rounded-lg p-3 w-full"
            value={
              settings.regularPercentage
            }
            onChange={(e) =>
              setSettings({
                ...settings,
                regularPercentage:
                  Number(
                    e.target.value,
                  ),
              })
            }
          />
        </div>

        <div>
          <label className="block mb-2">
            Premium %
          </label>

          <input
            type="number"
            className="border rounded-lg p-3 w-full"
            value={
              settings.premiumPercentage
            }
            onChange={(e) =>
              setSettings({
                ...settings,
                premiumPercentage:
                  Number(
                    e.target.value,
                  ),
              })
            }
          />
        </div>

        <div>
          <label className="block mb-2">
            VIP %
          </label>

          <input
            type="number"
            className="border rounded-lg p-3 w-full"
            value={
              settings.vipPercentage
            }
            onChange={(e) =>
              setSettings({
                ...settings,
                vipPercentage:
                  Number(
                    e.target.value,
                  ),
              })
            }
          />
        </div>

        <div>
          <label className="block mb-2">
            Per Amount
          </label>

          <input
            type="number"
            className="border rounded-lg p-3 w-full"
            value={
              settings.perAmount
            }
            onChange={(e) =>
              setSettings({
                ...settings,
                perAmount: Number(
                  e.target.value,
                ),
              })
            }
          />
        </div>

        <div>
          <label className="block mb-2">
            Minimum Redeem
          </label>

          <input
            type="number"
            className="border rounded-lg p-3 w-full"
            value={
              settings.minimumRedeem
            }
            onChange={(e) =>
              setSettings({
                ...settings,
                minimumRedeem:
                  Number(
                    e.target.value,
                  ),
              })
            }
          />
        </div>

        <div>
          <label className="block mb-2">
            Maximum Redeem
          </label>

          <input
            type="number"
            className="border rounded-lg p-3 w-full"
            value={
              settings.maximumRedeem
            }
            onChange={(e) =>
              setSettings({
                ...settings,
                maximumRedeem:
                  Number(
                    e.target.value,
                  ),
              })
            }
          />
        </div>

        <div>
          <label className="block mb-2">
            Expire Days
          </label>

          <input
            type="number"
            className="border rounded-lg p-3 w-full"
            value={
              settings.expireDays
            }
            onChange={(e) =>
              setSettings({
                ...settings,
                expireDays:
                  Number(
                    e.target.value,
                  ),
              })
            }
          />
        </div>

        <div className="flex items-center gap-3 mt-8">

          <input
            type="checkbox"
            checked={
              settings.isActive
            }
            onChange={(e) =>
              setSettings({
                ...settings,
                isActive:
                  e.target.checked,
              })
            }
          />

          <span>
            Reward System Active
          </span>

        </div>

      </div>

      <button
        onClick={save}
        disabled={saving}
        className="mt-8 bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 disabled:opacity-50"
      >
        {saving
          ? "Saving..."
          : "Save Settings"}
      </button>

    </div>
  );
}