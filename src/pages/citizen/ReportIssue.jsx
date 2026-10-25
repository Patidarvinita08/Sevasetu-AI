
import {
  ArrowRight,
  CheckCircle2,
  ImagePlus,
  MapPin,
  Mic,
  Sparkles,
  Upload,
  X,
} from "lucide-react";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const issueCategories = [
  {
    name: "Garbage",
    emoji: "🗑️",
    description: "Garbage pile or overflowing bin",
  },
  {
    name: "Road",
    emoji: "🛣️",
    description: "Pothole or damaged road",
  },
  {
    name: "Streetlight",
    emoji: "💡",
    description: "Non-working streetlight",
  },
  {
    name: "Water",
    emoji: "💧",
    description: "Water leakage or supply issue",
  },
  {
    name: "Drainage",
    emoji: "🚰",
    description: "Blocked or open drain",
  },
  {
    name: "Infrastructure",
    emoji: "🏗️",
    description: "Damaged public property",
  },
];

export default function ReportIssue() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImage = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Image size must be less than 10 MB.");
      event.target.value = "";
      return;
    }

    setImage({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    });
  };

  const removeImage = () => {
    if (image?.preview) {
      URL.revokeObjectURL(image.preview);
    }

    setImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const analyzeIssue = () => {
    if (!image && !description.trim() && !category) {
      alert(
        "Please add a photo, description, or select an issue category."
      );
      return;
    }

    setIsAnalyzing(true);

    // Temporary mock AI analysis.
    // This will be replaced by the FastAPI AI endpoint.
    setTimeout(() => {
      try {
        const selectedCategory =
          category || detectCategory(description);

        const aiResult = {
          category: selectedCategory,

          severity:
            selectedCategory === "Road" ||
            selectedCategory === "Water"
              ? "High"
              : "Medium",

          confidence: selectedCategory ? 94 : 87,

          department: getDepartment(selectedCategory),

          description:
            description.trim() ||
            `AI detected a possible ${selectedCategory.toLowerCase()} related civic issue.`,

          location:
            location.trim() || "Location to be confirmed",

          image: image?.preview || null,
          imageName: image?.name || null,

          // Image upload to FastAPI is a separate next step.
          image_url: null,
        };

        sessionStorage.setItem(
          "sevasetuComplaint",
          JSON.stringify(aiResult)
        );

        navigate("/citizen/review");
      } catch (error) {
        console.error("Issue analysis error:", error);
        alert("Unable to analyze the issue. Please try again.");
      } finally {
        setIsAnalyzing(false);
      }
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-7">
      {/* HEADER */}
      <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-600 p-7 text-white shadow-xl md:p-9">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />

        <div className="relative">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-bold backdrop-blur">
            <Sparkles size={14} />
            AI-Powered Civic Reporting
          </div>

          <h1 className="text-3xl font-extrabold md:text-4xl">
            Report an Issue
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-50 md:text-base">
            Upload a photo, describe the problem and let
            SevaSetu AI classify the issue, estimate its
            priority and identify the responsible department.
          </p>
        </div>
      </section>

      {/* STEP INDICATOR */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
        <Step number="1" label="Report" active />
        <div className="h-px w-12 bg-slate-200" />
        <Step number="2" label="AI Review" />
        <div className="h-px w-12 bg-slate-200" />
        <Step number="3" label="Submit" />
        <div className="h-px w-12 bg-slate-200" />
        <Step number="4" label="Track" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* LEFT COLUMN */}
        <div className="space-y-6 lg:col-span-2">
          {/* PHOTO */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-lg font-bold text-slate-900">
                1. Add Photo Evidence
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                A photo helps AI understand the civic issue.
              </p>
            </div>

            {!image ? (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-emerald-200 bg-gradient-to-br from-emerald-50 to-cyan-50 px-6 py-12 transition hover:border-emerald-400 hover:bg-emerald-50"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-md">
                  <ImagePlus size={30} />
                </div>

                <p className="mt-4 font-bold text-slate-800">
                  Upload an issue photo
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  JPG, PNG or WEBP — maximum 10 MB
                </p>

                <span className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold text-white">
                  <Upload size={15} />
                  Choose Photo
                </span>
              </button>
            ) : (
              <div className="relative overflow-hidden rounded-2xl border border-slate-200">
                <img
                  src={image.preview}
                  alt="Issue preview"
                  className="max-h-[420px] w-full object-cover"
                />

                <button
                  type="button"
                  onClick={removeImage}
                  aria-label="Remove photo"
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-red-500"
                >
                  <X size={18} />
                </button>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-12">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <CheckCircle2 size={17} />
                    Photo added
                  </div>

                  <p className="mt-1 truncate text-xs text-white/70">
                    {image.name}
                  </p>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImage}
              className="hidden"
            />
          </section>

          {/* DESCRIPTION */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-lg font-bold text-slate-900">
                2. Describe the Issue
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Type what happened or use the voice option.
              </p>
            </div>

            <div className="relative">
              <textarea
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                rows={6}
                placeholder="Example: There is a large pothole near the market entrance and vehicles are having difficulty passing..."
                className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 pr-14 text-sm leading-6 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50"
              />

              <button
                type="button"
                title="Voice input will be connected to Speech-to-Text"
                onClick={() =>
                  alert("Voice input will be added in the next AI phase.")
                }
                className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 transition hover:bg-purple-200"
              >
                <Mic size={19} />
              </button>
            </div>

            <div className="mt-2 flex justify-between text-xs text-slate-400">
              <span>{description.length} characters</span>
              <span>Voice input coming in AI phase</span>
            </div>
          </section>

          {/* CATEGORY */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-lg font-bold text-slate-900">
                3. Select Issue Type
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Optional — SevaSetu AI can also identify this automatically.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {issueCategories.map((item) => {
                const selected = category === item.name;

                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setCategory(item.name)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      selected
                        ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-100"
                        : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/50"
                    }`}
                  >
                    <div className="text-2xl">{item.emoji}</div>

                    <p className="mt-2 text-sm font-bold text-slate-900">
                      {item.name}
                    </p>

                    <p className="mt-1 text-[11px] leading-4 text-slate-500">
                      {item.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          {/* LOCATION */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-lg font-bold text-slate-900">
                4. Confirm Location
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Add the location where the issue was observed.
              </p>
            </div>

            <div className="flex gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <MapPin size={21} />
              </div>

              <div className="flex-1">
                <input
                  value={location}
                  onChange={(event) =>
                    setLocation(event.target.value)
                  }
                  placeholder="Example: Vijay Nagar, Indore"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />

                <button
                  type="button"
                  onClick={() =>
                    setLocation("Vijay Nagar, Indore")
                  }
                  className="mt-2 text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  Use sample location
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT SUMMARY */}
        <aside className="h-fit space-y-5 lg:sticky lg:top-6">
          <section className="overflow-hidden rounded-3xl border border-purple-100 bg-white shadow-sm">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-5 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                  <Sparkles size={19} />
                </div>

                <div>
                  <p className="font-bold">SevaSetu AI</p>
                  <p className="text-xs text-purple-100">
                    Smart complaint analysis
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-5">
              <SummaryRow
                label="Photo"
                value={image ? "Added" : "Not added"}
                active={Boolean(image)}
              />

              <SummaryRow
                label="Description"
                value={description.trim() ? "Added" : "Not added"}
                active={Boolean(description.trim())}
              />

              <SummaryRow
                label="Category"
                value={category || "AI will detect"}
                active={Boolean(category)}
              />

              <SummaryRow
                label="Location"
                value={location || "To be confirmed"}
                active={Boolean(location)}
              />
            </div>
          </section>

          <button
            type="button"
            onClick={analyzeIssue}
            disabled={isAnalyzing}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 px-5 py-4 text-sm font-extrabold text-white shadow-xl shadow-emerald-200 transition hover:-translate-y-0.5 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isAnalyzing ? (
              <>
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                AI Analyzing...
              </>
            ) : (
              <>
                <Sparkles size={19} />
                Analyze with SevaSetu AI
                <ArrowRight size={18} />
              </>
            )}
          </button>

          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <p className="text-xs font-bold text-blue-700">
              Prototype AI
            </p>

            <p className="mt-1 text-xs leading-5 text-blue-600">
              This stage currently uses mock AI results. The FastAPI
              multimodal AI service will replace this layer later.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Step({ number, label, active }) {
  return (
    <div
      className={`flex items-center gap-2 whitespace-nowrap ${
        active ? "text-emerald-600" : "text-slate-400"
      }`}
    >
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-extrabold ${
          active
            ? "bg-emerald-500 text-white shadow-md"
            : "bg-slate-100 text-slate-400"
        }`}
      >
        {number}
      </span>

      <span className="text-xs font-bold">{label}</span>
    </div>
  );
}

function SummaryRow({ label, value, active }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-xs font-semibold text-slate-400">
        {label}
      </span>

      <span
        className={`max-w-[170px] text-right text-xs font-bold ${
          active ? "text-emerald-600" : "text-slate-500"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function detectCategory(text) {
  const value = text.toLowerCase();

  if (
    value.includes("pothole") ||
    value.includes("road")
  ) {
    return "Road";
  }

  if (
    value.includes("garbage") ||
    value.includes("waste") ||
    value.includes("trash")
  ) {
    return "Garbage";
  }

  if (
    value.includes("light") ||
    value.includes("streetlight")
  ) {
    return "Streetlight";
  }

  if (
    value.includes("water") ||
    value.includes("leak")
  ) {
    return "Water";
  }

  if (
    value.includes("drain") ||
    value.includes("drainage")
  ) {
    return "Drainage";
  }

  return "Infrastructure";
}

function getDepartment(category) {
  const departments = {
    Garbage: "Municipal Sanitation Department",
    Road: "Public Works Department",
    Streetlight: "Electrical Department",
    Water: "Water Supply Department",
    Drainage: "Drainage Department",
    Infrastructure: "Municipal Infrastructure Department",
  };

  return departments[category] || "Municipal Administration";
}
