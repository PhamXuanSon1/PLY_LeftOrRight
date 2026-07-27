using System.Collections.Generic;

namespace Spine
{
	public static class HashSetExtensions
	{
		public static bool AddAll<T>(this HashSet<T> set, T[] addSet)
		{
			bool anyItemAdded = false;
			int i = 0;
			for (int j = addSet.Length; i < j; i++)
			{
				T item = addSet[i];
				anyItemAdded |= set.Add(item);
			}
			return anyItemAdded;
		}
	}
}
