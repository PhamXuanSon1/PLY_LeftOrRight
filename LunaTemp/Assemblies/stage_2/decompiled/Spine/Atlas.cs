using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.IO;

namespace Spine
{
	public class Atlas : IEnumerable<AtlasRegion>, IEnumerable
	{
		private readonly List<AtlasPage> pages = new List<AtlasPage>();

		private List<AtlasRegion> regions = new List<AtlasRegion>();

		private TextureLoader textureLoader;

		public List<AtlasRegion> Regions => regions;

		public List<AtlasPage> Pages => pages;

		public IEnumerator<AtlasRegion> GetEnumerator()
		{
			return regions.GetEnumerator();
		}

		IEnumerator IEnumerable.GetEnumerator()
		{
			return regions.GetEnumerator();
		}

		public Atlas(List<AtlasPage> pages, List<AtlasRegion> regions)
		{
			if (pages == null)
			{
				throw new ArgumentNullException("pages", "pages cannot be null.");
			}
			if (regions == null)
			{
				throw new ArgumentNullException("regions", "regions cannot be null.");
			}
			this.pages = pages;
			this.regions = regions;
			textureLoader = null;
		}

		public Atlas(TextReader reader, string imagesDir, TextureLoader textureLoader)
		{
			if (reader == null)
			{
				throw new ArgumentNullException("reader", "reader cannot be null.");
			}
			if (imagesDir == null)
			{
				throw new ArgumentNullException("imagesDir", "imagesDir cannot be null.");
			}
			if (textureLoader == null)
			{
				throw new ArgumentNullException("textureLoader", "textureLoader cannot be null.");
			}
			this.textureLoader = textureLoader;
			string[] entry = new string[5];
			AtlasPage page = null;
			AtlasRegion region = null;
			Dictionary<string, Action> pageFields = new Dictionary<string, Action>(5)
			{
				{
					"size",
					delegate
					{
						page.width = int.Parse(entry[1], CultureInfo.InvariantCulture);
						page.height = int.Parse(entry[2], CultureInfo.InvariantCulture);
					}
				},
				{
					"format",
					delegate
					{
						page.format = (Format)Enum.Parse(typeof(Format), entry[1], false);
					}
				},
				{
					"filter",
					delegate
					{
						page.minFilter = (TextureFilter)Enum.Parse(typeof(TextureFilter), entry[1], false);
						page.magFilter = (TextureFilter)Enum.Parse(typeof(TextureFilter), entry[2], false);
					}
				},
				{
					"repeat",
					delegate
					{
						if (entry[1].IndexOf('x') != -1)
						{
							page.uWrap = TextureWrap.Repeat;
						}
						if (entry[1].IndexOf('y') != -1)
						{
							page.vWrap = TextureWrap.Repeat;
						}
					}
				},
				{
					"pma",
					delegate
					{
						page.pma = entry[1] == "true";
					}
				}
			};
			Dictionary<string, Action> regionFields = new Dictionary<string, Action>(8)
			{
				{
					"xy",
					delegate
					{
						region.x = int.Parse(entry[1], CultureInfo.InvariantCulture);
						region.y = int.Parse(entry[2], CultureInfo.InvariantCulture);
					}
				},
				{
					"size",
					delegate
					{
						region.width = int.Parse(entry[1], CultureInfo.InvariantCulture);
						region.height = int.Parse(entry[2], CultureInfo.InvariantCulture);
					}
				},
				{
					"bounds",
					delegate
					{
						region.x = int.Parse(entry[1], CultureInfo.InvariantCulture);
						region.y = int.Parse(entry[2], CultureInfo.InvariantCulture);
						region.width = int.Parse(entry[3], CultureInfo.InvariantCulture);
						region.height = int.Parse(entry[4], CultureInfo.InvariantCulture);
					}
				},
				{
					"offset",
					delegate
					{
						region.offsetX = int.Parse(entry[1], CultureInfo.InvariantCulture);
						region.offsetY = int.Parse(entry[2], CultureInfo.InvariantCulture);
					}
				},
				{
					"orig",
					delegate
					{
						region.originalWidth = int.Parse(entry[1], CultureInfo.InvariantCulture);
						region.originalHeight = int.Parse(entry[2], CultureInfo.InvariantCulture);
					}
				},
				{
					"offsets",
					delegate
					{
						region.offsetX = int.Parse(entry[1], CultureInfo.InvariantCulture);
						region.offsetY = int.Parse(entry[2], CultureInfo.InvariantCulture);
						region.originalWidth = int.Parse(entry[3], CultureInfo.InvariantCulture);
						region.originalHeight = int.Parse(entry[4], CultureInfo.InvariantCulture);
					}
				},
				{
					"rotate",
					delegate
					{
						string text = entry[1];
						if (text == "true")
						{
							region.degrees = 90;
						}
						else if (text != "false")
						{
							region.degrees = int.Parse(text, CultureInfo.InvariantCulture);
						}
					}
				},
				{
					"index",
					delegate
					{
						region.index = int.Parse(entry[1], CultureInfo.InvariantCulture);
					}
				}
			};
			string line = reader.ReadLine();
			while (line != null && line.Trim().Length == 0)
			{
				line = reader.ReadLine();
			}
			while (line != null && line.Trim().Length != 0 && ReadEntry(entry, line) != 0)
			{
				line = reader.ReadLine();
			}
			List<string> names = null;
			List<int[]> values = null;
			while (line != null)
			{
				if (line.Trim().Length == 0)
				{
					page = null;
					line = reader.ReadLine();
					continue;
				}
				if (page == null)
				{
					page = new AtlasPage();
					page.name = line.Trim();
					while (ReadEntry(entry, line = reader.ReadLine()) != 0)
					{
						if (pageFields.TryGetValue(entry[0], out var field2))
						{
							field2();
						}
					}
					textureLoader.Load(page, Path.Combine(imagesDir, page.name));
					pages.Add(page);
					continue;
				}
				region = new AtlasRegion();
				region.page = page;
				region.name = line;
				while (true)
				{
					int count = ReadEntry(entry, line = reader.ReadLine());
					if (count == 0)
					{
						break;
					}
					if (regionFields.TryGetValue(entry[0], out var field))
					{
						field();
						continue;
					}
					if (names == null)
					{
						names = new List<string>(8);
						values = new List<int[]>(8);
					}
					names.Add(entry[0]);
					int[] entryValues = new int[count];
					for (int i = 0; i < count; i++)
					{
						int.TryParse(entry[i + 1], NumberStyles.Any, CultureInfo.InvariantCulture, out entryValues[i]);
					}
					values.Add(entryValues);
				}
				if (region.originalWidth == 0 && region.originalHeight == 0)
				{
					region.originalWidth = region.width;
					region.originalHeight = region.height;
				}
				if (names != null && names.Count > 0)
				{
					region.names = names.ToArray();
					region.values = values.ToArray();
					names.Clear();
					values.Clear();
				}
				region.u = (float)region.x / (float)page.width;
				region.v = (float)region.y / (float)page.height;
				if (region.degrees == 90)
				{
					region.u2 = (float)(region.x + region.height) / (float)page.width;
					region.v2 = (float)(region.y + region.width) / (float)page.height;
					int tempSwap = region.packedWidth;
					region.packedWidth = region.packedHeight;
					region.packedHeight = tempSwap;
				}
				else
				{
					region.u2 = (float)(region.x + region.width) / (float)page.width;
					region.v2 = (float)(region.y + region.height) / (float)page.height;
				}
				regions.Add(region);
			}
		}

		private static int ReadEntry(string[] entry, string line)
		{
			if (line == null)
			{
				return 0;
			}
			line = line.Trim();
			if (line.Length == 0)
			{
				return 0;
			}
			int colon = line.IndexOf(':');
			if (colon == -1)
			{
				return 0;
			}
			entry[0] = line.Substring(0, colon).Trim();
			int i = 1;
			int lastMatch = colon + 1;
			while (true)
			{
				int comma = line.IndexOf(',', lastMatch);
				if (comma == -1)
				{
					entry[i] = line.Substring(lastMatch).Trim();
					return i;
				}
				entry[i] = line.Substring(lastMatch, comma - lastMatch).Trim();
				lastMatch = comma + 1;
				if (i == 4)
				{
					break;
				}
				i++;
			}
			return 4;
		}

		public void FlipV()
		{
			int i = 0;
			for (int j = regions.Count; i < j; i++)
			{
				AtlasRegion region = regions[i];
				region.v = 1f - region.v;
				region.v2 = 1f - region.v2;
			}
		}

		public AtlasRegion FindRegion(string name)
		{
			int i = 0;
			for (int j = regions.Count; i < j; i++)
			{
				if (regions[i].name == name)
				{
					return regions[i];
				}
			}
			return null;
		}

		public void Dispose()
		{
			if (textureLoader != null)
			{
				int i = 0;
				for (int j = pages.Count; i < j; i++)
				{
					textureLoader.Unload(pages[i].rendererObject);
				}
			}
		}
	}
}
