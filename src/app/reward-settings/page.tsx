"use client";

import { useEffect, useState } from "react";

import {
  getRewardSettings,
  updateRewardSettings,
} from "@/src/services/reward.service";

import { RewardSettings } from "@/src/types/reward";

export default function RewardSettingsPage() {
  const [settings, setSettings] =
    useState<RewardSettings | null>(
      null,
    );

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings =
    async () => {
      try {
        const data =
          await getRewardSettings();

        setSettings(data);
      } finally {
        setLoading(false);
      }
    };

  const save =
    async () => {
      if (!settings) return;

      await updateRewardSettings(
        settings,
      );

      alert(
        "Reward Settings Updated",
      );
    };

  if (
    loading ||
    !settings
  ) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-3xl">

      <h1 className="text-3xl font-bold mb-8">
        Reward Settings
      </h1>

      <div className="grid grid-cols-2 gap-5">

        <div>
          <label>
            Regular %
          </label>

          <input
            type="number"
            className="border w-full p-3 rounded-lg"
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
          <label>
            Premium %
          </label>

          <input
            type="number"
            className="border w-full p-3 rounded-lg"
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
          <label>VIP %</label>

          <input
            type="number"
            className="border w-full p-3 rounded-lg"
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
          <label>
            Every Amount
          </label>

          <input
            type="number"
            className="border w-full p-3 rounded-lg"
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
          <label>
            Minimum Redeem
          </label>

          <input
            type="number"
            className="border w-full p-3 rounded-lg"
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
          <label>
            Maximum Redeem
          </label>

          <input
            type="number"
            className="border w-full p-3 rounded-lg"
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
          <label>
            Expire Days
          </label>

          <input
            type="number"
            className="border w-full p-3 rounded-lg"
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
        className="mt-8 bg-black text-white px-8 py-3 rounded-xl"
      >
        Save Settings
      </button>

    </div>
  );
}