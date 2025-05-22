using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;
using System.Collections.Generic;

namespace MealBox.API.Tools
{
    public class MealImageApiTest
    {
        private static readonly HttpClient client = new HttpClient();

        public static async Task TestMealImagesAsync(string apiUrl)
        {
            try
            {
                var response = await client.GetAsync(apiUrl + "/meals");
                response.EnsureSuccessStatusCode();

                var json = await response.Content.ReadAsStringAsync();
                var meals = JsonSerializer.Deserialize<List<Meal>>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                if (meals == null || meals.Count == 0)
                {
                    Console.WriteLine("No meals found from API.");
                    return;
                }

                foreach (var meal in meals)
                {
                    Console.WriteLine($"Meal: {meal.Name}");
                    Console.WriteLine($"ImageUrl: {meal.ImageUrl}");

                    if (string.IsNullOrEmpty(meal.ImageUrl))
                    {
                        Console.WriteLine("  Warning: ImageUrl is empty.");
                        continue;
                    }

                    try
                    {
                        var imgResponse = await client.GetAsync(meal.ImageUrl);
                        if (imgResponse.IsSuccessStatusCode)
                        {
                            Console.WriteLine("  Image URL is accessible.");
                        }
                        else
                        {
                            Console.WriteLine($"  Image URL returned status code: {imgResponse.StatusCode}");
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"  Error accessing image URL: {ex.Message}");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching meals from API: {ex.Message}");
            }
        }
    }

    public class Meal
    {
        public string Name { get; set; }
        public string ImageUrl { get; set; }
    }
}
