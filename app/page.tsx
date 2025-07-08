"use client"

import { useState } from "react"
import {
  Moon,
  Sun,
  Upload,
  BarChart3,
  Home,
  Lightbulb,
  Github,
  Linkedin,
  MapPin,
  DollarSign,
  TrendingUp,
  Users,
  Building,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false)
  const [formData, setFormData] = useState({
    medianIncome: "",
    houseAge: [10],
    avgRooms: "",
    avgBedrooms: "",
    population: "",
    households: "",
    latitude: "",
    longitude: "",
  })
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string | number[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePredict = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock prediction based on inputs
    const basePrice = 200000
    const incomeMultiplier = Number.parseFloat(formData.medianIncome) * 50000 || 0
    const ageAdjustment = (50 - formData.houseAge[0]) * 1000
    const roomsAdjustment = Number.parseFloat(formData.avgRooms) * 10000 || 0

    const mockPrice = basePrice + incomeMultiplier + ageAdjustment + roomsAdjustment
    setPredictedPrice(Math.max(100000, mockPrice))
    setIsLoading(false)
  }

  const featureImportances = [
    { name: "Median Income", importance: 85, color: "bg-teal-500" },
    { name: "Location (Lat/Long)", importance: 72, color: "bg-indigo-500" },
    { name: "Average Rooms", importance: 58, color: "bg-purple-500" },
    { name: "House Age", importance: 45, color: "bg-blue-500" },
    { name: "Population Density", importance: 38, color: "bg-green-500" },
  ]

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-900" : "bg-gradient-to-br from-slate-50 to-blue-50"}`}
    >
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">
                Cleardeals AI
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
              >
                Home
              </a>
              <a
                href="#insights"
                className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
              >
                Insights
              </a>
              <a
                href="#upload"
                className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
              >
                Upload
              </a>
              <a
                href="#about"
                className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
              >
                About
              </a>
            </div>

            <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)} className="rounded-full">
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-teal-500 to-indigo-600 rounded-2xl mb-6">
              <Building className="w-10 h-10 text-white" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Predict California Housing Prices{" "}
            <span className="bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">with AI</span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Leverage machine learning to estimate property prices instantly. Get accurate predictions based on location,
            property features, and market data.
          </p>

          <Button
            size="lg"
            className="bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => document.getElementById("prediction-form")?.scrollIntoView({ behavior: "smooth" })}
          >
            Try Demo
            <TrendingUp className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Main Card Section (Form) */}
      <section id="prediction-form" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border-0 shadow-2xl rounded-2xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">Enter Property Details</CardTitle>
              <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
                Fill in the property information to get an AI-powered price prediction
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="medianIncome" className="text-sm font-medium flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-teal-600" />
                    Median Income (in 10k USD)
                  </Label>
                  <Input
                    id="medianIncome"
                    type="number"
                    placeholder="e.g., 5.2"
                    value={formData.medianIncome}
                    onChange={(e) => handleInputChange("medianIncome", e.target.value)}
                    className="rounded-xl border-gray-200 dark:border-gray-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center">
                    <Building className="w-4 h-4 mr-2 text-teal-600" />
                    House Age: {formData.houseAge[0]} years
                  </Label>
                  <Slider
                    value={formData.houseAge}
                    onValueChange={(value) => handleInputChange("houseAge", value)}
                    max={50}
                    min={1}
                    step={1}
                    className="py-4"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="avgRooms" className="text-sm font-medium flex items-center">
                    <Home className="w-4 h-4 mr-2 text-teal-600" />
                    Average Rooms
                  </Label>
                  <Input
                    id="avgRooms"
                    type="number"
                    placeholder="e.g., 6.5"
                    value={formData.avgRooms}
                    onChange={(e) => handleInputChange("avgRooms", e.target.value)}
                    className="rounded-xl border-gray-200 dark:border-gray-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="avgBedrooms" className="text-sm font-medium">
                    Average Bedrooms
                  </Label>
                  <Input
                    id="avgBedrooms"
                    type="number"
                    placeholder="e.g., 1.2"
                    value={formData.avgBedrooms}
                    onChange={(e) => handleInputChange("avgBedrooms", e.target.value)}
                    className="rounded-xl border-gray-200 dark:border-gray-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="population" className="text-sm font-medium flex items-center">
                    <Users className="w-4 h-4 mr-2 text-teal-600" />
                    Population
                  </Label>
                  <Input
                    id="population"
                    type="number"
                    placeholder="e.g., 3500"
                    value={formData.population}
                    onChange={(e) => handleInputChange("population", e.target.value)}
                    className="rounded-xl border-gray-200 dark:border-gray-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="households" className="text-sm font-medium">
                    Households
                  </Label>
                  <Input
                    id="households"
                    type="number"
                    placeholder="e.g., 1200"
                    value={formData.households}
                    onChange={(e) => handleInputChange("households", e.target.value)}
                    className="rounded-xl border-gray-200 dark:border-gray-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="latitude" className="text-sm font-medium flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-teal-600" />
                    Latitude
                  </Label>
                  <Input
                    id="latitude"
                    type="number"
                    placeholder="e.g., 34.05"
                    value={formData.latitude}
                    onChange={(e) => handleInputChange("latitude", e.target.value)}
                    className="rounded-xl border-gray-200 dark:border-gray-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="longitude" className="text-sm font-medium">
                    Longitude
                  </Label>
                  <Input
                    id="longitude"
                    type="number"
                    placeholder="e.g., -118.25"
                    value={formData.longitude}
                    onChange={(e) => handleInputChange("longitude", e.target.value)}
                    className="rounded-xl border-gray-200 dark:border-gray-600"
                  />
                </div>
              </div>

              <div className="text-center pt-6">
                <Button
                  onClick={handlePredict}
                  disabled={isLoading}
                  size="lg"
                  className="bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 text-white px-12 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Predicting...
                    </>
                  ) : (
                    <>
                      Predict Price
                      <BarChart3 className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Results Section */}
      {predictedPrice && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border-0 shadow-2xl rounded-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Prediction Results</CardTitle>
              </CardHeader>

              <CardContent className="text-center space-y-6">
                <div className="bg-gradient-to-r from-teal-50 to-indigo-50 dark:from-teal-900/20 dark:to-indigo-900/20 rounded-2xl p-8">
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Predicted Price</h3>
                  <p className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">
                    ${predictedPrice.toLocaleString()}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Confidence Score</h4>
                    <div className="flex items-center space-x-2">
                      <Progress value={87} className="flex-1" />
                      <span className="text-sm font-medium">87%</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Price Range</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      ${(predictedPrice * 0.9).toLocaleString()} - ${(predictedPrice * 1.1).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Upload Section */}
      <section id="upload" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-800/50">
        <div className="max-w-4xl mx-auto">
          <Card className="backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border-0 shadow-xl rounded-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center justify-center">
                <Upload className="w-6 h-6 mr-2 text-teal-600" />
                Batch Prediction
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Upload a CSV file for multiple property predictions
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-teal-500 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300 mb-2">Drop your CSV file here or click to browse</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Supports CSV files up to 10MB</p>
                <Button variant="outline" className="mt-4 rounded-xl bg-transparent">
                  Choose File
                </Button>
              </div>

              <div className="text-center">
                <Button className="bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 text-white rounded-xl">
                  Process Batch
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Insights Section */}
      <section id="insights" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How Does the Model Work?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our AI model analyzes multiple factors to predict housing prices with high accuracy
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border-0 shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-bold text-gray-900 dark:text-white">
                  <Lightbulb className="w-6 h-6 mr-2 text-teal-600" />
                  Feature Importance
                </CardTitle>
                <CardDescription>Top factors that influence housing price predictions</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {featureImportances.map((feature, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{feature.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {feature.importance}%
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${feature.color}`}
                        style={{ width: `${feature.importance}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border-0 shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-bold text-gray-900 dark:text-white">
                  <BarChart3 className="w-6 h-6 mr-2 text-indigo-600" />
                  Model Performance
                </CardTitle>
                <CardDescription>Key metrics and model statistics</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-teal-50 dark:bg-teal-900/20 rounded-xl">
                    <p className="text-2xl font-bold text-teal-600">94.2%</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Accuracy</p>
                  </div>
                  <div className="text-center p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                    <p className="text-2xl font-bold text-indigo-600">$15K</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Avg Error</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Training Data</span>
                    <span className="text-sm font-medium">20,640 samples</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Algorithm</span>
                    <span className="text-sm font-medium">Random Forest</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Last Updated</span>
                    <span className="text-sm font-medium">Dec 2024</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Cleardeals AI</span>
            </div>

            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Github className="w-6 h-6" />
              </a>
            </div>

            <Separator className="bg-gray-700" />

            <p className="text-gray-400 text-sm">© 2025 Cleardeals AI Intern Project – Built with ❤️</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
