using System;
using System.Text;

namespace Spine
{
	public class Sequence
	{
		private static int nextID = 0;

		private static readonly object nextIdLock = new object();

		internal readonly int id;

		internal readonly TextureRegion[] regions;

		internal int start;

		internal int digits;

		internal int setupIndex;

		public int Start
		{
			get
			{
				return start;
			}
			set
			{
				start = value;
			}
		}

		public int Digits
		{
			get
			{
				return digits;
			}
			set
			{
				digits = value;
			}
		}

		public int SetupIndex
		{
			get
			{
				return setupIndex;
			}
			set
			{
				setupIndex = value;
			}
		}

		public TextureRegion[] Regions => regions;

		public int Id => id;

		public Sequence(int count)
		{
			lock (nextIdLock)
			{
				id = nextID++;
			}
			regions = new TextureRegion[count];
		}

		public Sequence(Sequence other)
		{
			lock (nextIdLock)
			{
				id = nextID++;
			}
			regions = new TextureRegion[other.regions.Length];
			Array.Copy(other.regions, 0, regions, 0, regions.Length);
			start = other.start;
			digits = other.digits;
			setupIndex = other.setupIndex;
		}

		public void Apply(Slot slot, IHasTextureRegion attachment)
		{
			int index = slot.SequenceIndex;
			if (index == -1)
			{
				index = setupIndex;
			}
			if (index >= regions.Length)
			{
				index = regions.Length - 1;
			}
			TextureRegion region = regions[index];
			if (attachment.Region != region)
			{
				attachment.Region = region;
				attachment.UpdateRegion();
			}
		}

		public string GetPath(string basePath, int index)
		{
			StringBuilder buffer = new StringBuilder(basePath.Length + digits);
			buffer.Append(basePath);
			string frame = (start + index).ToString();
			for (int i = digits - frame.Length; i > 0; i--)
			{
				buffer.Append('0');
			}
			buffer.Append(frame);
			return buffer.ToString();
		}
	}
}
