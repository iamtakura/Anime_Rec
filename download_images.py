import json
import os
import requests
import time
import sys

def download_image(url, filepath):
    headers = {
        'User-Agent': 'Mozilla/5.0'
    }
    try:
        response = requests.get(url, headers=headers, stream=True, timeout=10)
        response.raise_for_status()
        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(1024):
                f.write(chunk)
        return True
    except Exception as e:
        print(f"Error downloading {url}: {e}")
        return False

def search_jikan_and_download(title, image_name):
    # Jikan API v4 Search
    url = f"https://api.jikan.moe/v4/anime?q={title}&limit=1"
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        data = response.json()
        if data.get('data') and len(data['data']) > 0:
            anime_data = data['data'][0]
            # Try to get large image url
            image_url = anime_data.get('images', {}).get('jpg', {}).get('large_image_url')
            if not image_url:
                image_url = anime_data.get('images', {}).get('jpg', {}).get('image_url')
            
            if image_url:
                print(f"Attempting to download from Jikan: {image_url}")
                if download_image(image_url, image_name):
                    print(f"Successfully downloaded {image_name}")
                    return True
    except Exception as e:
        print(f"Jikan API failed for {title}: {e}")
    return False

def main():
    json_path = 'anime-data.json'
    if not os.path.exists(json_path):
        print(f"Could not find {json_path}")
        return

    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    animes = []
    for genre in data.get('genres', []):
        for anime in genre.get('anime', []):
            animes.append(anime)
            
    print(f"Found {len(animes)} animes to process.")
    
    for anime in animes:
        title = anime.get('title')
        image_name = anime.get('image')
        
        if not title or not image_name:
            continue
            
        if os.path.exists(image_name):
            file_size = os.path.getsize(image_name)
            # if the file is tiny, it might be a broken download or a generic error page
            if file_size > 5000: 
                print(f"Skipping {title}, image {image_name} already exists.")
                continue
            else:
                print(f"File {image_name} exists but is very small ({file_size} bytes). Redownloading...")
            
        print(f"Searching for: {title}")
        
        success = search_jikan_and_download(title, image_name)
        if not success:
            print(f"Failed to download image for {title}")
            
        time.sleep(1.5) # Jikan allows 60 req/min, 1.5s = 40 req/min

if __name__ == '__main__':
    main()
