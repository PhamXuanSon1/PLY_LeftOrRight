var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i5850 = root || request.c( 'UnityEngine.JointSpring' )
  var i5851 = data
  i5850.spring = i5851[0]
  i5850.damper = i5851[1]
  i5850.targetPosition = i5851[2]
  return i5850
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i5852 = root || request.c( 'UnityEngine.JointMotor' )
  var i5853 = data
  i5852.m_TargetVelocity = i5853[0]
  i5852.m_Force = i5853[1]
  i5852.m_FreeSpin = i5853[2]
  return i5852
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i5854 = root || request.c( 'UnityEngine.JointLimits' )
  var i5855 = data
  i5854.m_Min = i5855[0]
  i5854.m_Max = i5855[1]
  i5854.m_Bounciness = i5855[2]
  i5854.m_BounceMinVelocity = i5855[3]
  i5854.m_ContactDistance = i5855[4]
  i5854.minBounce = i5855[5]
  i5854.maxBounce = i5855[6]
  return i5854
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i5856 = root || request.c( 'UnityEngine.JointDrive' )
  var i5857 = data
  i5856.m_PositionSpring = i5857[0]
  i5856.m_PositionDamper = i5857[1]
  i5856.m_MaximumForce = i5857[2]
  i5856.m_UseAcceleration = i5857[3]
  return i5856
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i5858 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i5859 = data
  i5858.m_Spring = i5859[0]
  i5858.m_Damper = i5859[1]
  return i5858
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i5860 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i5861 = data
  i5860.m_Limit = i5861[0]
  i5860.m_Bounciness = i5861[1]
  i5860.m_ContactDistance = i5861[2]
  return i5860
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i5862 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i5863 = data
  i5862.m_ExtremumSlip = i5863[0]
  i5862.m_ExtremumValue = i5863[1]
  i5862.m_AsymptoteSlip = i5863[2]
  i5862.m_AsymptoteValue = i5863[3]
  i5862.m_Stiffness = i5863[4]
  return i5862
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i5864 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i5865 = data
  i5864.m_LowerAngle = i5865[0]
  i5864.m_UpperAngle = i5865[1]
  return i5864
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i5866 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i5867 = data
  i5866.m_MotorSpeed = i5867[0]
  i5866.m_MaximumMotorTorque = i5867[1]
  return i5866
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i5868 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i5869 = data
  i5868.m_DampingRatio = i5869[0]
  i5868.m_Frequency = i5869[1]
  i5868.m_Angle = i5869[2]
  return i5868
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i5870 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i5871 = data
  i5870.m_LowerTranslation = i5871[0]
  i5870.m_UpperTranslation = i5871[1]
  return i5870
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i5872 = root || new pc.UnityMaterial()
  var i5873 = data
  i5872.name = i5873[0]
  request.r(i5873[1], i5873[2], 0, i5872, 'shader')
  i5872.renderQueue = i5873[3]
  i5872.enableInstancing = !!i5873[4]
  var i5875 = i5873[5]
  var i5874 = []
  for(var i = 0; i < i5875.length; i += 1) {
    i5874.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i5875[i + 0]) );
  }
  i5872.floatParameters = i5874
  var i5877 = i5873[6]
  var i5876 = []
  for(var i = 0; i < i5877.length; i += 1) {
    i5876.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i5877[i + 0]) );
  }
  i5872.colorParameters = i5876
  var i5879 = i5873[7]
  var i5878 = []
  for(var i = 0; i < i5879.length; i += 1) {
    i5878.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i5879[i + 0]) );
  }
  i5872.vectorParameters = i5878
  var i5881 = i5873[8]
  var i5880 = []
  for(var i = 0; i < i5881.length; i += 1) {
    i5880.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i5881[i + 0]) );
  }
  i5872.textureParameters = i5880
  var i5883 = i5873[9]
  var i5882 = []
  for(var i = 0; i < i5883.length; i += 1) {
    i5882.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i5883[i + 0]) );
  }
  i5872.materialFlags = i5882
  return i5872
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i5886 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i5887 = data
  i5886.name = i5887[0]
  i5886.value = i5887[1]
  return i5886
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i5890 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i5891 = data
  i5890.name = i5891[0]
  i5890.value = new pc.Color(i5891[1], i5891[2], i5891[3], i5891[4])
  return i5890
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i5894 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i5895 = data
  i5894.name = i5895[0]
  i5894.value = new pc.Vec4( i5895[1], i5895[2], i5895[3], i5895[4] )
  return i5894
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i5898 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i5899 = data
  i5898.name = i5899[0]
  request.r(i5899[1], i5899[2], 0, i5898, 'value')
  return i5898
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i5902 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i5903 = data
  i5902.name = i5903[0]
  i5902.enabled = !!i5903[1]
  return i5902
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i5904 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i5905 = data
  i5904.name = i5905[0]
  i5904.width = i5905[1]
  i5904.height = i5905[2]
  i5904.mipmapCount = i5905[3]
  i5904.anisoLevel = i5905[4]
  i5904.filterMode = i5905[5]
  i5904.hdr = !!i5905[6]
  i5904.format = i5905[7]
  i5904.wrapMode = i5905[8]
  i5904.alphaIsTransparency = !!i5905[9]
  i5904.alphaSource = i5905[10]
  i5904.graphicsFormat = i5905[11]
  i5904.sRGBTexture = !!i5905[12]
  i5904.desiredColorSpace = i5905[13]
  i5904.wrapU = i5905[14]
  i5904.wrapV = i5905[15]
  return i5904
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i5906 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i5907 = data
  i5906.name = i5907[0]
  i5906.halfPrecision = !!i5907[1]
  i5906.useSimplification = !!i5907[2]
  i5906.useUInt32IndexFormat = !!i5907[3]
  i5906.vertexCount = i5907[4]
  i5906.aabb = i5907[5]
  var i5909 = i5907[6]
  var i5908 = []
  for(var i = 0; i < i5909.length; i += 1) {
    i5908.push( !!i5909[i + 0] );
  }
  i5906.streams = i5908
  i5906.vertices = i5907[7]
  var i5911 = i5907[8]
  var i5910 = []
  for(var i = 0; i < i5911.length; i += 1) {
    i5910.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i5911[i + 0]) );
  }
  i5906.subMeshes = i5910
  var i5913 = i5907[9]
  var i5912 = []
  for(var i = 0; i < i5913.length; i += 16) {
    i5912.push( new pc.Mat4().setData(i5913[i + 0], i5913[i + 1], i5913[i + 2], i5913[i + 3],  i5913[i + 4], i5913[i + 5], i5913[i + 6], i5913[i + 7],  i5913[i + 8], i5913[i + 9], i5913[i + 10], i5913[i + 11],  i5913[i + 12], i5913[i + 13], i5913[i + 14], i5913[i + 15]) );
  }
  i5906.bindposes = i5912
  var i5915 = i5907[10]
  var i5914 = []
  for(var i = 0; i < i5915.length; i += 1) {
    i5914.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i5915[i + 0]) );
  }
  i5906.blendShapes = i5914
  return i5906
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i5920 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i5921 = data
  i5920.triangles = i5921[0]
  return i5920
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i5926 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i5927 = data
  i5926.name = i5927[0]
  var i5929 = i5927[1]
  var i5928 = []
  for(var i = 0; i < i5929.length; i += 1) {
    i5928.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i5929[i + 0]) );
  }
  i5926.frames = i5928
  return i5926
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Transform"] = function (request, data, root) {
  var i5930 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Transform' )
  var i5931 = data
  i5930.position = new pc.Vec3( i5931[0], i5931[1], i5931[2] )
  i5930.scale = new pc.Vec3( i5931[3], i5931[4], i5931[5] )
  i5930.rotation = new pc.Quat(i5931[6], i5931[7], i5931[8], i5931[9])
  return i5930
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Animator"] = function (request, data, root) {
  var i5932 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Animator' )
  var i5933 = data
  request.r(i5933[0], i5933[1], 0, i5932, 'animatorController')
  request.r(i5933[2], i5933[3], 0, i5932, 'avatar')
  i5932.updateMode = i5933[4]
  i5932.hasTransformHierarchy = !!i5933[5]
  i5932.applyRootMotion = !!i5933[6]
  var i5935 = i5933[7]
  var i5934 = []
  for(var i = 0; i < i5935.length; i += 2) {
  request.r(i5935[i + 0], i5935[i + 1], 2, i5934, '')
  }
  i5932.humanBones = i5934
  i5932.enabled = !!i5933[8]
  return i5932
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer"] = function (request, data, root) {
  var i5938 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer' )
  var i5939 = data
  i5938.color = new pc.Color(i5939[0], i5939[1], i5939[2], i5939[3])
  request.r(i5939[4], i5939[5], 0, i5938, 'sprite')
  i5938.flipX = !!i5939[6]
  i5938.flipY = !!i5939[7]
  i5938.drawMode = i5939[8]
  i5938.size = new pc.Vec2( i5939[9], i5939[10] )
  i5938.tileMode = i5939[11]
  i5938.adaptiveModeThreshold = i5939[12]
  i5938.maskInteraction = i5939[13]
  i5938.spriteSortPoint = i5939[14]
  i5938.enabled = !!i5939[15]
  request.r(i5939[16], i5939[17], 0, i5938, 'sharedMaterial')
  var i5941 = i5939[18]
  var i5940 = []
  for(var i = 0; i < i5941.length; i += 2) {
  request.r(i5941[i + 0], i5941[i + 1], 2, i5940, '')
  }
  i5938.sharedMaterials = i5940
  i5938.receiveShadows = !!i5939[19]
  i5938.shadowCastingMode = i5939[20]
  i5938.sortingLayerID = i5939[21]
  i5938.sortingOrder = i5939[22]
  i5938.lightmapIndex = i5939[23]
  i5938.lightmapSceneIndex = i5939[24]
  i5938.lightmapScaleOffset = new pc.Vec4( i5939[25], i5939[26], i5939[27], i5939[28] )
  i5938.lightProbeUsage = i5939[29]
  i5938.reflectionProbeUsage = i5939[30]
  return i5938
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i5944 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i5945 = data
  i5944.name = i5945[0]
  i5944.tagId = i5945[1]
  i5944.enabled = !!i5945[2]
  i5944.isStatic = !!i5945[3]
  i5944.layer = i5945[4]
  return i5944
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i5946 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i5947 = data
  i5946.name = i5947[0]
  i5946.index = i5947[1]
  i5946.startup = !!i5947[2]
  return i5946
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i5948 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i5949 = data
  i5948.aspect = i5949[0]
  i5948.orthographic = !!i5949[1]
  i5948.orthographicSize = i5949[2]
  i5948.backgroundColor = new pc.Color(i5949[3], i5949[4], i5949[5], i5949[6])
  i5948.nearClipPlane = i5949[7]
  i5948.farClipPlane = i5949[8]
  i5948.fieldOfView = i5949[9]
  i5948.depth = i5949[10]
  i5948.clearFlags = i5949[11]
  i5948.cullingMask = i5949[12]
  i5948.rect = i5949[13]
  request.r(i5949[14], i5949[15], 0, i5948, 'targetTexture')
  i5948.usePhysicalProperties = !!i5949[16]
  i5948.focalLength = i5949[17]
  i5948.sensorSize = new pc.Vec2( i5949[18], i5949[19] )
  i5948.lensShift = new pc.Vec2( i5949[20], i5949[21] )
  i5948.gateFit = i5949[22]
  i5948.commandBufferCount = i5949[23]
  i5948.cameraType = i5949[24]
  i5948.enabled = !!i5949[25]
  return i5948
}

Deserializers["AutoCameraFit"] = function (request, data, root) {
  var i5950 = root || request.c( 'AutoCameraFit' )
  var i5951 = data
  request.r(i5951[0], i5951[1], 0, i5950, 'tallScreenObject')
  i5950.tallScreenRatioThreshold = i5951[2]
  i5950.tallScreenYOffset = i5951[3]
  request.r(i5951[4], i5951[5], 0, i5950, 'canvasBtn')
  request.r(i5951[6], i5951[7], 0, i5950, 'targetArea')
  i5950.paddingLandscape = i5951[8]
  i5950.paddingPortrait = i5951[9]
  i5950.extraPaddingSmallScreen = i5951[10]
  i5950.smallScreenThreshold = i5951[11]
  i5950.autoUpdateOnResize = !!i5951[12]
  i5950.adjustInEditMode = !!i5951[13]
  return i5950
}

Deserializers["CharacterManager"] = function (request, data, root) {
  var i5952 = root || request.c( 'CharacterManager' )
  var i5953 = data
  var i5955 = i5953[0]
  var i5954 = new (System.Collections.Generic.List$1(Bridge.ns('CharacterEquipmentSetup')))
  for(var i = 0; i < i5955.length; i += 1) {
    i5954.add(request.d('CharacterEquipmentSetup', i5955[i + 0]));
  }
  i5952.characterSetups = i5954
  request.r(i5953[1], i5953[2], 0, i5952, 'character1')
  request.r(i5953[3], i5953[4], 0, i5952, 'targetTestCharacter')
  request.r(i5953[5], i5953[6], 0, i5952, 'testEquipmentDataAsset')
  var i5957 = i5953[7]
  var i5956 = new (System.Collections.Generic.List$1(Bridge.ns('SkinToggleEntry')))
  for(var i = 0; i < i5957.length; i += 1) {
    i5956.add(request.d('SkinToggleEntry', i5957[i + 0]));
  }
  i5952.mySkinSet = i5956
  return i5952
}

Deserializers["CharacterEquipmentSetup"] = function (request, data, root) {
  var i5960 = root || request.c( 'CharacterEquipmentSetup' )
  var i5961 = data
  request.r(i5961[0], i5961[1], 0, i5960, 'character')
  request.r(i5961[2], i5961[3], 0, i5960, 'equipmentData')
  return i5960
}

Deserializers["SkinToggleEntry"] = function (request, data, root) {
  var i5964 = root || request.c( 'SkinToggleEntry' )
  var i5965 = data
  i5964.isEnabled = !!i5965[0]
  i5964.skinName = i5965[1]
  request.r(i5965[2], i5965[3], 0, i5964, 'skeletonDataAsset')
  return i5964
}

Deserializers["GameManager"] = function (request, data, root) {
  var i5966 = root || request.c( 'GameManager' )
  var i5967 = data
  i5966.isGoogleBuild = !!i5967[0]
  var i5969 = i5967[1]
  var i5968 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.GameObject')))
  for(var i = 0; i < i5969.length; i += 2) {
  request.r(i5969[i + 0], i5969[i + 1], 1, i5968, '')
  }
  i5966.googleDisabledObjects = i5968
  var i5971 = i5967[2]
  var i5970 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Behaviour')))
  for(var i = 0; i < i5971.length; i += 2) {
  request.r(i5971[i + 0], i5971[i + 1], 1, i5970, '')
  }
  i5966.googleDisabledBehaviours = i5970
  return i5966
}

Deserializers["SlotManager"] = function (request, data, root) {
  var i5976 = root || request.c( 'SlotManager' )
  var i5977 = data
  var i5979 = i5977[0]
  var i5978 = new (System.Collections.Generic.List$1(Bridge.ns('SlotSetup')))
  for(var i = 0; i < i5979.length; i += 2) {
  request.r(i5979[i + 0], i5979[i + 1], 1, i5978, '')
  }
  i5976.allSlots = i5978
  i5976.maxSlotsToPlay = i5977[1]
  request.r(i5977[2], i5977[3], 0, i5976, 'objectToHideOnFirstClick')
  request.r(i5977[4], i5977[5], 0, i5976, 'rightEffectPrefab')
  request.r(i5977[6], i5977[7], 0, i5976, 'rightEffectSpawnPoint')
  var i5981 = i5977[8]
  var i5980 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Sprite')))
  for(var i = 0; i < i5981.length; i += 2) {
  request.r(i5981[i + 0], i5981[i + 1], 1, i5980, '')
  }
  i5976.rightEffectSprites = i5980
  return i5976
}

Deserializers["Ply_Pool"] = function (request, data, root) {
  var i5986 = root || request.c( 'Ply_Pool' )
  var i5987 = data
  var i5989 = i5987[0]
  var i5988 = []
  for(var i = 0; i < i5989.length; i += 1) {
    i5988.push( request.d('Ply_Pool+PoolAmount', i5989[i + 0]) );
  }
  i5986.poolAmounts = i5988
  return i5986
}

Deserializers["Ply_Pool+PoolAmount"] = function (request, data, root) {
  var i5992 = root || request.c( 'Ply_Pool+PoolAmount' )
  var i5993 = data
  i5992.type = i5993[0]
  i5992.amount = i5993[1]
  request.r(i5993[2], i5993[3], 0, i5992, 'gameUnit')
  return i5992
}

Deserializers["Ply_SoundManager"] = function (request, data, root) {
  var i5994 = root || request.c( 'Ply_SoundManager' )
  var i5995 = data
  i5994.fxAudio = request.d('FxAudio', i5995[0], i5994.fxAudio)
  request.r(i5995[1], i5995[2], 0, i5994, 'bgm')
  return i5994
}

Deserializers["FxAudio"] = function (request, data, root) {
  var i5996 = root || request.c( 'FxAudio' )
  var i5997 = data
  i5996.Left = request.d('SoundData', i5997[0], i5996.Left)
  i5996.Right = request.d('SoundData', i5997[1], i5996.Right)
  i5996.Yeah = request.d('SoundData', i5997[2], i5996.Yeah)
  return i5996
}

Deserializers["SoundData"] = function (request, data, root) {
  var i5998 = root || request.c( 'SoundData' )
  var i5999 = data
  request.r(i5999[0], i5999[1], 0, i5998, 'clip')
  i5998.repeatCount = i5999[2]
  return i5998
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i6000 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i6001 = data
  request.r(i6001[0], i6001[1], 0, i6000, 'clip')
  request.r(i6001[2], i6001[3], 0, i6000, 'outputAudioMixerGroup')
  i6000.playOnAwake = !!i6001[4]
  i6000.loop = !!i6001[5]
  i6000.time = i6001[6]
  i6000.volume = i6001[7]
  i6000.pitch = i6001[8]
  i6000.enabled = !!i6001[9]
  return i6000
}

Deserializers["ProgressTrackingManager"] = function (request, data, root) {
  var i6002 = root || request.c( 'ProgressTrackingManager' )
  var i6003 = data
  i6002.maxScore = i6003[0]
  i6002.currentScore = i6003[1]
  i6002.currentPercent = i6003[2]
  return i6002
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider"] = function (request, data, root) {
  var i6004 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider' )
  var i6005 = data
  i6004.center = new pc.Vec3( i6005[0], i6005[1], i6005[2] )
  i6004.radius = i6005[3]
  i6004.height = i6005[4]
  i6004.direction = i6005[5]
  i6004.enabled = !!i6005[6]
  i6004.isTrigger = !!i6005[7]
  request.r(i6005[8], i6005[9], 0, i6004, 'material')
  return i6004
}

Deserializers["BalloonController"] = function (request, data, root) {
  var i6006 = root || request.c( 'BalloonController' )
  var i6007 = data
  request.r(i6007[0], i6007[1], 0, i6006, 'targetItem')
  i6006.interactableLayer = UnityEngine.LayerMask.FromIntegerValue( i6007[2] )
  i6006.flyDuration = i6007[3]
  i6006.scaleDuration = i6007[4]
  i6006.delayBeforeNextSlot = i6007[5]
  i6006.onBalloonClicked = request.d('UnityEngine.Events.UnityEvent', i6007[6], i6006.onBalloonClicked)
  return i6006
}

Deserializers["UnityEngine.Events.UnityEvent"] = function (request, data, root) {
  var i6008 = root || request.c( 'UnityEngine.Events.UnityEvent' )
  var i6009 = data
  i6008.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i6009[0], i6008.m_PersistentCalls)
  return i6008
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i6010 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i6011 = data
  var i6013 = i6011[0]
  var i6012 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i6013.length; i += 1) {
    i6012.add(request.d('UnityEngine.Events.PersistentCall', i6013[i + 0]));
  }
  i6010.m_Calls = i6012
  return i6010
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i6016 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i6017 = data
  request.r(i6017[0], i6017[1], 0, i6016, 'm_Target')
  i6016.m_TargetAssemblyTypeName = i6017[2]
  i6016.m_MethodName = i6017[3]
  i6016.m_Mode = i6017[4]
  i6016.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i6017[5], i6016.m_Arguments)
  i6016.m_CallState = i6017[6]
  return i6016
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i6018 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i6019 = data
  request.r(i6019[0], i6019[1], 0, i6018, 'm_ObjectArgument')
  i6018.m_ObjectArgumentAssemblyTypeName = i6019[2]
  i6018.m_IntArgument = i6019[3]
  i6018.m_FloatArgument = i6019[4]
  i6018.m_StringArgument = i6019[5]
  i6018.m_BoolArgument = !!i6019[6]
  return i6018
}

Deserializers["BalloonActionTrigger"] = function (request, data, root) {
  var i6020 = root || request.c( 'BalloonActionTrigger' )
  var i6021 = data
  request.r(i6021[0], i6021[1], 0, i6020, 'targetCharacter')
  i6020.animationTrack = i6021[2]
  i6020.animationName = i6021[3]
  i6020.clearOtherAnimations = !!i6021[4]
  request.r(i6021[5], i6021[6], 0, i6020, 'skeletonDataAsset')
  return i6020
}

Deserializers["SlotSetup"] = function (request, data, root) {
  var i6022 = root || request.c( 'SlotSetup' )
  var i6023 = data
  request.r(i6023[0], i6023[1], 0, i6022, 'slotData')
  request.r(i6023[2], i6023[3], 0, i6022, 'borderGold')
  request.r(i6023[4], i6023[5], 0, i6022, 'borderWhite')
  request.r(i6023[6], i6023[7], 0, i6022, 'greyCard')
  request.r(i6023[8], i6023[9], 0, i6022, 'blueCard')
  request.r(i6023[10], i6023[11], 0, i6022, 'greenCard')
  request.r(i6023[12], i6023[13], 0, i6022, 'greenTick')
  request.r(i6023[14], i6023[15], 0, i6022, 'leftBalloonObj')
  request.r(i6023[16], i6023[17], 0, i6022, 'rightBalloonObj')
  request.r(i6023[18], i6023[19], 0, i6022, 'leftBalloonItemRenderer')
  request.r(i6023[20], i6023[21], 0, i6022, 'rightBalloonItemRenderer')
  return i6022
}

Deserializers["ScreenHeightPositionAnchor"] = function (request, data, root) {
  var i6024 = root || request.c( 'ScreenHeightPositionAnchor' )
  var i6025 = data
  request.r(i6025[0], i6025[1], 0, i6024, 'anchorPoint')
  request.r(i6025[2], i6025[3], 0, i6024, 'targetCamera')
  i6024.viewportYRatio = i6025[4]
  i6024.alignOnStart = !!i6025[5]
  i6024.alignOnEnable = !!i6025[6]
  i6024.alwaysUpdate = !!i6025[7]
  i6024.realignOnScreenSizeChanged = !!i6025[8]
  i6024.drawGizmos = !!i6025[9]
  i6024.targetLineColor = new pc.Color(i6025[10], i6025[11], i6025[12], i6025[13])
  i6024.anchorColor = new pc.Color(i6025[14], i6025[15], i6025[16], i6025[17])
  return i6024
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i6026 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i6027 = data
  request.r(i6027[0], i6027[1], 0, i6026, 'sharedMesh')
  return i6026
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i6028 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i6029 = data
  request.r(i6029[0], i6029[1], 0, i6028, 'additionalVertexStreams')
  i6028.enabled = !!i6029[2]
  request.r(i6029[3], i6029[4], 0, i6028, 'sharedMaterial')
  var i6031 = i6029[5]
  var i6030 = []
  for(var i = 0; i < i6031.length; i += 2) {
  request.r(i6031[i + 0], i6031[i + 1], 2, i6030, '')
  }
  i6028.sharedMaterials = i6030
  i6028.receiveShadows = !!i6029[6]
  i6028.shadowCastingMode = i6029[7]
  i6028.sortingLayerID = i6029[8]
  i6028.sortingOrder = i6029[9]
  i6028.lightmapIndex = i6029[10]
  i6028.lightmapSceneIndex = i6029[11]
  i6028.lightmapScaleOffset = new pc.Vec4( i6029[12], i6029[13], i6029[14], i6029[15] )
  i6028.lightProbeUsage = i6029[16]
  i6028.reflectionProbeUsage = i6029[17]
  return i6028
}

Deserializers["Spine.Unity.SkeletonAnimation"] = function (request, data, root) {
  var i6032 = root || request.c( 'Spine.Unity.SkeletonAnimation' )
  var i6033 = data
  i6032.loop = !!i6033[0]
  i6032.timeScale = i6033[1]
  request.r(i6033[2], i6033[3], 0, i6032, 'skeletonDataAsset')
  i6032.initialSkinName = i6033[4]
  i6032.fixPrefabOverrideViaMeshFilter = i6033[5]
  i6032.initialFlipX = !!i6033[6]
  i6032.initialFlipY = !!i6033[7]
  i6032.updateWhenInvisible = i6033[8]
  i6032.zSpacing = i6033[9]
  i6032.useClipping = !!i6033[10]
  i6032.immutableTriangles = !!i6033[11]
  i6032.pmaVertexColors = !!i6033[12]
  i6032.clearStateOnDisable = !!i6033[13]
  i6032.tintBlack = !!i6033[14]
  i6032.singleSubmesh = !!i6033[15]
  i6032.fixDrawOrder = !!i6033[16]
  i6032.addNormals = !!i6033[17]
  i6032.calculateTangents = !!i6033[18]
  i6032.maskInteraction = i6033[19]
  i6032.maskMaterials = request.d('Spine.Unity.SkeletonRenderer+SpriteMaskInteractionMaterials', i6033[20], i6032.maskMaterials)
  i6032.disableRenderingOnOverride = !!i6033[21]
  i6032.updateTiming = i6033[22]
  i6032.unscaledTime = !!i6033[23]
  i6032._animationName = i6033[24]
  var i6035 = i6033[25]
  var i6034 = []
  for(var i = 0; i < i6035.length; i += 1) {
    i6034.push( i6035[i + 0] );
  }
  i6032.separatorSlotNames = i6034
  i6032.physicsPositionInheritanceFactor = new pc.Vec2( i6033[26], i6033[27] )
  i6032.physicsRotationInheritanceFactor = i6033[28]
  request.r(i6033[29], i6033[30], 0, i6032, 'physicsMovementRelativeTo')
  return i6032
}

Deserializers["Spine.Unity.SkeletonRenderer+SpriteMaskInteractionMaterials"] = function (request, data, root) {
  var i6036 = root || request.c( 'Spine.Unity.SkeletonRenderer+SpriteMaskInteractionMaterials' )
  var i6037 = data
  var i6039 = i6037[0]
  var i6038 = []
  for(var i = 0; i < i6039.length; i += 2) {
  request.r(i6039[i + 0], i6039[i + 1], 2, i6038, '')
  }
  i6036.materialsMaskDisabled = i6038
  var i6041 = i6037[1]
  var i6040 = []
  for(var i = 0; i < i6041.length; i += 2) {
  request.r(i6041[i + 0], i6041[i + 1], 2, i6040, '')
  }
  i6036.materialsInsideMask = i6040
  var i6043 = i6037[2]
  var i6042 = []
  for(var i = 0; i < i6043.length; i += 2) {
  request.r(i6043[i + 0], i6043[i + 1], 2, i6042, '')
  }
  i6036.materialsOutsideMask = i6042
  return i6036
}

Deserializers["Character"] = function (request, data, root) {
  var i6046 = root || request.c( 'Character' )
  var i6047 = data
  var i6049 = i6047[0]
  var i6048 = new (System.Collections.Generic.List$1(Bridge.ns('System.String')))
  for(var i = 0; i < i6049.length; i += 1) {
    i6048.add(i6049[i + 0]);
  }
  i6046.currentAppliedSkinNames = i6048
  request.r(i6047[1], i6047[2], 0, i6046, 'tf')
  request.r(i6047[3], i6047[4], 0, i6046, 'skeletonAnimation')
  var i6051 = i6047[5]
  var i6050 = new (System.Collections.Generic.List$1(Bridge.ns('SlotAttachmentPair')))
  for(var i = 0; i < i6051.length; i += 1) {
    i6050.add(request.d('SlotAttachmentPair', i6051[i + 0]));
  }
  i6046.currentAppliedPairs = i6050
  return i6046
}

Deserializers["SlotAttachmentPair"] = function (request, data, root) {
  var i6056 = root || request.c( 'SlotAttachmentPair' )
  var i6057 = data
  i6056.isEnabled = !!i6057[0]
  i6056.slotName = i6057[1]
  i6056.attachmentName = i6057[2]
  request.r(i6057[3], i6057[4], 0, i6056, 'skeletonDataAsset')
  return i6056
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i6058 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i6059 = data
  i6058.pivot = new pc.Vec2( i6059[0], i6059[1] )
  i6058.anchorMin = new pc.Vec2( i6059[2], i6059[3] )
  i6058.anchorMax = new pc.Vec2( i6059[4], i6059[5] )
  i6058.sizeDelta = new pc.Vec2( i6059[6], i6059[7] )
  i6058.anchoredPosition3D = new pc.Vec3( i6059[8], i6059[9], i6059[10] )
  i6058.rotation = new pc.Quat(i6059[11], i6059[12], i6059[13], i6059[14])
  i6058.scale = new pc.Vec3( i6059[15], i6059[16], i6059[17] )
  return i6058
}

Deserializers["TMPro.TextMeshPro"] = function (request, data, root) {
  var i6060 = root || request.c( 'TMPro.TextMeshPro' )
  var i6061 = data
  i6060._SortingLayer = i6061[0]
  i6060._SortingLayerID = i6061[1]
  i6060._SortingOrder = i6061[2]
  i6060.m_hasFontAssetChanged = !!i6061[3]
  request.r(i6061[4], i6061[5], 0, i6060, 'm_renderer')
  i6060.m_maskType = i6061[6]
  i6060.m_text = i6061[7]
  i6060.m_isRightToLeft = !!i6061[8]
  request.r(i6061[9], i6061[10], 0, i6060, 'm_fontAsset')
  request.r(i6061[11], i6061[12], 0, i6060, 'm_sharedMaterial')
  var i6063 = i6061[13]
  var i6062 = []
  for(var i = 0; i < i6063.length; i += 2) {
  request.r(i6063[i + 0], i6063[i + 1], 2, i6062, '')
  }
  i6060.m_fontSharedMaterials = i6062
  request.r(i6061[14], i6061[15], 0, i6060, 'm_fontMaterial')
  var i6065 = i6061[16]
  var i6064 = []
  for(var i = 0; i < i6065.length; i += 2) {
  request.r(i6065[i + 0], i6065[i + 1], 2, i6064, '')
  }
  i6060.m_fontMaterials = i6064
  i6060.m_fontColor32 = UnityEngine.Color32.ConstructColor(i6061[17], i6061[18], i6061[19], i6061[20])
  i6060.m_fontColor = new pc.Color(i6061[21], i6061[22], i6061[23], i6061[24])
  i6060.m_enableVertexGradient = !!i6061[25]
  i6060.m_colorMode = i6061[26]
  i6060.m_fontColorGradient = request.d('TMPro.VertexGradient', i6061[27], i6060.m_fontColorGradient)
  request.r(i6061[28], i6061[29], 0, i6060, 'm_fontColorGradientPreset')
  request.r(i6061[30], i6061[31], 0, i6060, 'm_spriteAsset')
  i6060.m_tintAllSprites = !!i6061[32]
  request.r(i6061[33], i6061[34], 0, i6060, 'm_StyleSheet')
  i6060.m_TextStyleHashCode = i6061[35]
  i6060.m_overrideHtmlColors = !!i6061[36]
  i6060.m_faceColor = UnityEngine.Color32.ConstructColor(i6061[37], i6061[38], i6061[39], i6061[40])
  i6060.m_fontSize = i6061[41]
  i6060.m_fontSizeBase = i6061[42]
  i6060.m_fontWeight = i6061[43]
  i6060.m_enableAutoSizing = !!i6061[44]
  i6060.m_fontSizeMin = i6061[45]
  i6060.m_fontSizeMax = i6061[46]
  i6060.m_fontStyle = i6061[47]
  i6060.m_HorizontalAlignment = i6061[48]
  i6060.m_VerticalAlignment = i6061[49]
  i6060.m_textAlignment = i6061[50]
  i6060.m_characterSpacing = i6061[51]
  i6060.m_wordSpacing = i6061[52]
  i6060.m_lineSpacing = i6061[53]
  i6060.m_lineSpacingMax = i6061[54]
  i6060.m_paragraphSpacing = i6061[55]
  i6060.m_charWidthMaxAdj = i6061[56]
  i6060.m_TextWrappingMode = i6061[57]
  i6060.m_wordWrappingRatios = i6061[58]
  i6060.m_overflowMode = i6061[59]
  request.r(i6061[60], i6061[61], 0, i6060, 'm_linkedTextComponent')
  request.r(i6061[62], i6061[63], 0, i6060, 'parentLinkedComponent')
  i6060.m_enableKerning = !!i6061[64]
  var i6067 = i6061[65]
  var i6066 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i6067.length; i += 1) {
    i6066.add(i6067[i + 0]);
  }
  i6060.m_ActiveFontFeatures = i6066
  i6060.m_enableExtraPadding = !!i6061[66]
  i6060.checkPaddingRequired = !!i6061[67]
  i6060.m_isRichText = !!i6061[68]
  i6060.m_parseCtrlCharacters = !!i6061[69]
  i6060.m_isOrthographic = !!i6061[70]
  i6060.m_isCullingEnabled = !!i6061[71]
  i6060.m_horizontalMapping = i6061[72]
  i6060.m_verticalMapping = i6061[73]
  i6060.m_uvLineOffset = i6061[74]
  i6060.m_geometrySortingOrder = i6061[75]
  i6060.m_IsTextObjectScaleStatic = !!i6061[76]
  i6060.m_VertexBufferAutoSizeReduction = !!i6061[77]
  i6060.m_useMaxVisibleDescender = !!i6061[78]
  i6060.m_pageToDisplay = i6061[79]
  i6060.m_margin = new pc.Vec4( i6061[80], i6061[81], i6061[82], i6061[83] )
  i6060.m_isUsingLegacyAnimationComponent = !!i6061[84]
  i6060.m_isVolumetricText = !!i6061[85]
  request.r(i6061[86], i6061[87], 0, i6060, 'm_Material')
  i6060.m_EmojiFallbackSupport = !!i6061[88]
  i6060.m_Maskable = !!i6061[89]
  i6060.m_Color = new pc.Color(i6061[90], i6061[91], i6061[92], i6061[93])
  i6060.m_RaycastTarget = !!i6061[94]
  i6060.m_RaycastPadding = new pc.Vec4( i6061[95], i6061[96], i6061[97], i6061[98] )
  return i6060
}

Deserializers["TMPro.VertexGradient"] = function (request, data, root) {
  var i6068 = root || request.c( 'TMPro.VertexGradient' )
  var i6069 = data
  i6068.topLeft = new pc.Color(i6069[0], i6069[1], i6069[2], i6069[3])
  i6068.topRight = new pc.Color(i6069[4], i6069[5], i6069[6], i6069[7])
  i6068.bottomLeft = new pc.Color(i6069[8], i6069[9], i6069[10], i6069[11])
  i6068.bottomRight = new pc.Color(i6069[12], i6069[13], i6069[14], i6069[15])
  return i6068
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i6072 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i6073 = data
  request.r(i6073[0], i6073[1], 0, i6072, 'm_FirstSelected')
  i6072.m_sendNavigationEvents = !!i6073[2]
  i6072.m_DragThreshold = i6073[3]
  return i6072
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i6074 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i6075 = data
  i6074.m_HorizontalAxis = i6075[0]
  i6074.m_VerticalAxis = i6075[1]
  i6074.m_SubmitButton = i6075[2]
  i6074.m_CancelButton = i6075[3]
  i6074.m_InputActionsPerSecond = i6075[4]
  i6074.m_RepeatDelay = i6075[5]
  i6074.m_ForceModuleActive = !!i6075[6]
  i6074.m_SendPointerHoverToParent = !!i6075[7]
  return i6074
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i6076 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i6077 = data
  i6076.ambientIntensity = i6077[0]
  i6076.reflectionIntensity = i6077[1]
  i6076.ambientMode = i6077[2]
  i6076.ambientLight = new pc.Color(i6077[3], i6077[4], i6077[5], i6077[6])
  i6076.ambientSkyColor = new pc.Color(i6077[7], i6077[8], i6077[9], i6077[10])
  i6076.ambientGroundColor = new pc.Color(i6077[11], i6077[12], i6077[13], i6077[14])
  i6076.ambientEquatorColor = new pc.Color(i6077[15], i6077[16], i6077[17], i6077[18])
  i6076.fogColor = new pc.Color(i6077[19], i6077[20], i6077[21], i6077[22])
  i6076.fogEndDistance = i6077[23]
  i6076.fogStartDistance = i6077[24]
  i6076.fogDensity = i6077[25]
  i6076.fog = !!i6077[26]
  request.r(i6077[27], i6077[28], 0, i6076, 'skybox')
  i6076.fogMode = i6077[29]
  var i6079 = i6077[30]
  var i6078 = []
  for(var i = 0; i < i6079.length; i += 1) {
    i6078.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i6079[i + 0]) );
  }
  i6076.lightmaps = i6078
  i6076.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i6077[31], i6076.lightProbes)
  i6076.lightmapsMode = i6077[32]
  i6076.mixedBakeMode = i6077[33]
  i6076.environmentLightingMode = i6077[34]
  i6076.ambientProbe = new pc.SphericalHarmonicsL2(i6077[35])
  i6076.referenceAmbientProbe = new pc.SphericalHarmonicsL2(i6077[36])
  i6076.useReferenceAmbientProbe = !!i6077[37]
  request.r(i6077[38], i6077[39], 0, i6076, 'customReflection')
  request.r(i6077[40], i6077[41], 0, i6076, 'defaultReflection')
  i6076.defaultReflectionMode = i6077[42]
  i6076.defaultReflectionResolution = i6077[43]
  i6076.sunLightObjectId = i6077[44]
  i6076.pixelLightCount = i6077[45]
  i6076.defaultReflectionHDR = !!i6077[46]
  i6076.hasLightDataAsset = !!i6077[47]
  i6076.hasManualGenerate = !!i6077[48]
  return i6076
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i6082 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i6083 = data
  request.r(i6083[0], i6083[1], 0, i6082, 'lightmapColor')
  request.r(i6083[2], i6083[3], 0, i6082, 'lightmapDirection')
  request.r(i6083[4], i6083[5], 0, i6082, 'shadowMask')
  return i6082
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i6084 = root || new UnityEngine.LightProbes()
  var i6085 = data
  return i6084
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i6092 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i6093 = data
  var i6095 = i6093[0]
  var i6094 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i6095.length; i += 1) {
    i6094.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i6095[i + 0]));
  }
  i6092.ShaderCompilationErrors = i6094
  i6092.name = i6093[1]
  i6092.guid = i6093[2]
  var i6097 = i6093[3]
  var i6096 = []
  for(var i = 0; i < i6097.length; i += 1) {
    i6096.push( i6097[i + 0] );
  }
  i6092.shaderDefinedKeywords = i6096
  var i6099 = i6093[4]
  var i6098 = []
  for(var i = 0; i < i6099.length; i += 1) {
    i6098.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i6099[i + 0]) );
  }
  i6092.passes = i6098
  var i6101 = i6093[5]
  var i6100 = []
  for(var i = 0; i < i6101.length; i += 1) {
    i6100.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i6101[i + 0]) );
  }
  i6092.usePasses = i6100
  var i6103 = i6093[6]
  var i6102 = []
  for(var i = 0; i < i6103.length; i += 1) {
    i6102.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i6103[i + 0]) );
  }
  i6092.defaultParameterValues = i6102
  request.r(i6093[7], i6093[8], 0, i6092, 'unityFallbackShader')
  i6092.readDepth = !!i6093[9]
  i6092.hasDepthOnlyPass = !!i6093[10]
  i6092.isCreatedByShaderGraph = !!i6093[11]
  i6092.disableBatching = !!i6093[12]
  i6092.compiled = !!i6093[13]
  return i6092
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i6106 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i6107 = data
  i6106.shaderName = i6107[0]
  i6106.errorMessage = i6107[1]
  return i6106
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i6110 = root || new pc.UnityShaderPass()
  var i6111 = data
  i6110.id = i6111[0]
  i6110.subShaderIndex = i6111[1]
  i6110.name = i6111[2]
  i6110.passType = i6111[3]
  i6110.grabPassTextureName = i6111[4]
  i6110.usePass = !!i6111[5]
  i6110.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6111[6], i6110.zTest)
  i6110.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6111[7], i6110.zWrite)
  i6110.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6111[8], i6110.culling)
  i6110.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i6111[9], i6110.blending)
  i6110.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i6111[10], i6110.alphaBlending)
  i6110.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6111[11], i6110.colorWriteMask)
  i6110.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6111[12], i6110.offsetUnits)
  i6110.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6111[13], i6110.offsetFactor)
  i6110.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6111[14], i6110.stencilRef)
  i6110.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6111[15], i6110.stencilReadMask)
  i6110.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6111[16], i6110.stencilWriteMask)
  i6110.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i6111[17], i6110.stencilOp)
  i6110.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i6111[18], i6110.stencilOpFront)
  i6110.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i6111[19], i6110.stencilOpBack)
  var i6113 = i6111[20]
  var i6112 = []
  for(var i = 0; i < i6113.length; i += 1) {
    i6112.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i6113[i + 0]) );
  }
  i6110.tags = i6112
  var i6115 = i6111[21]
  var i6114 = []
  for(var i = 0; i < i6115.length; i += 1) {
    i6114.push( i6115[i + 0] );
  }
  i6110.passDefinedKeywords = i6114
  var i6117 = i6111[22]
  var i6116 = []
  for(var i = 0; i < i6117.length; i += 1) {
    i6116.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i6117[i + 0]) );
  }
  i6110.passDefinedKeywordGroups = i6116
  var i6119 = i6111[23]
  var i6118 = []
  for(var i = 0; i < i6119.length; i += 1) {
    i6118.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i6119[i + 0]) );
  }
  i6110.variants = i6118
  var i6121 = i6111[24]
  var i6120 = []
  for(var i = 0; i < i6121.length; i += 1) {
    i6120.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i6121[i + 0]) );
  }
  i6110.excludedVariants = i6120
  i6110.hasDepthReader = !!i6111[25]
  return i6110
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i6122 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i6123 = data
  i6122.val = i6123[0]
  i6122.name = i6123[1]
  return i6122
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i6124 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i6125 = data
  i6124.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6125[0], i6124.src)
  i6124.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6125[1], i6124.dst)
  i6124.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6125[2], i6124.op)
  return i6124
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i6126 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i6127 = data
  i6126.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6127[0], i6126.pass)
  i6126.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6127[1], i6126.fail)
  i6126.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6127[2], i6126.zFail)
  i6126.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i6127[3], i6126.comp)
  return i6126
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i6130 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i6131 = data
  i6130.name = i6131[0]
  i6130.value = i6131[1]
  return i6130
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i6134 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i6135 = data
  var i6137 = i6135[0]
  var i6136 = []
  for(var i = 0; i < i6137.length; i += 1) {
    i6136.push( i6137[i + 0] );
  }
  i6134.keywords = i6136
  i6134.hasDiscard = !!i6135[1]
  return i6134
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i6140 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i6141 = data
  i6140.passId = i6141[0]
  i6140.subShaderIndex = i6141[1]
  var i6143 = i6141[2]
  var i6142 = []
  for(var i = 0; i < i6143.length; i += 1) {
    i6142.push( i6143[i + 0] );
  }
  i6140.keywords = i6142
  i6140.vertexProgram = i6141[3]
  i6140.fragmentProgram = i6141[4]
  i6140.exportedForWebGl2 = !!i6141[5]
  i6140.readDepth = !!i6141[6]
  return i6140
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i6146 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i6147 = data
  request.r(i6147[0], i6147[1], 0, i6146, 'shader')
  i6146.pass = i6147[2]
  return i6146
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i6150 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i6151 = data
  i6150.name = i6151[0]
  i6150.type = i6151[1]
  i6150.value = new pc.Vec4( i6151[2], i6151[3], i6151[4], i6151[5] )
  i6150.textureValue = i6151[6]
  i6150.shaderPropertyFlag = i6151[7]
  return i6150
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i6152 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i6153 = data
  i6152.name = i6153[0]
  request.r(i6153[1], i6153[2], 0, i6152, 'texture')
  i6152.aabb = i6153[3]
  i6152.vertices = i6153[4]
  i6152.triangles = i6153[5]
  i6152.textureRect = UnityEngine.Rect.MinMaxRect(i6153[6], i6153[7], i6153[8], i6153[9])
  i6152.packedRect = UnityEngine.Rect.MinMaxRect(i6153[10], i6153[11], i6153[12], i6153[13])
  i6152.border = new pc.Vec4( i6153[14], i6153[15], i6153[16], i6153[17] )
  i6152.transparency = i6153[18]
  i6152.bounds = i6153[19]
  i6152.pixelsPerUnit = i6153[20]
  i6152.textureWidth = i6153[21]
  i6152.textureHeight = i6153[22]
  i6152.nativeSize = new pc.Vec2( i6153[23], i6153[24] )
  i6152.pivot = new pc.Vec2( i6153[25], i6153[26] )
  i6152.textureRectOffset = new pc.Vec2( i6153[27], i6153[28] )
  return i6152
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i6154 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i6155 = data
  i6154.name = i6155[0]
  return i6154
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip"] = function (request, data, root) {
  var i6156 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip' )
  var i6157 = data
  i6156.name = i6157[0]
  i6156.wrapMode = i6157[1]
  i6156.isLooping = !!i6157[2]
  i6156.length = i6157[3]
  var i6159 = i6157[4]
  var i6158 = []
  for(var i = 0; i < i6159.length; i += 1) {
    i6158.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve', i6159[i + 0]) );
  }
  i6156.curves = i6158
  var i6161 = i6157[5]
  var i6160 = []
  for(var i = 0; i < i6161.length; i += 1) {
    i6160.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent', i6161[i + 0]) );
  }
  i6156.events = i6160
  i6156.halfPrecision = !!i6157[6]
  i6156._frameRate = i6157[7]
  i6156.localBounds = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds', i6157[8], i6156.localBounds)
  i6156.hasMuscleCurves = !!i6157[9]
  var i6163 = i6157[10]
  var i6162 = []
  for(var i = 0; i < i6163.length; i += 1) {
    i6162.push( i6163[i + 0] );
  }
  i6156.clipMuscleConstant = i6162
  i6156.clipBindingConstant = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant', i6157[11], i6156.clipBindingConstant)
  return i6156
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve"] = function (request, data, root) {
  var i6166 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve' )
  var i6167 = data
  i6166.path = i6167[0]
  i6166.hash = i6167[1]
  i6166.componentType = i6167[2]
  i6166.property = i6167[3]
  i6166.keys = i6167[4]
  var i6169 = i6167[5]
  var i6168 = []
  for(var i = 0; i < i6169.length; i += 1) {
    i6168.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey', i6169[i + 0]) );
  }
  i6166.objectReferenceKeys = i6168
  return i6166
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey"] = function (request, data, root) {
  var i6172 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey' )
  var i6173 = data
  i6172.time = i6173[0]
  request.r(i6173[1], i6173[2], 0, i6172, 'value')
  return i6172
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent"] = function (request, data, root) {
  var i6176 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent' )
  var i6177 = data
  i6176.functionName = i6177[0]
  i6176.floatParameter = i6177[1]
  i6176.intParameter = i6177[2]
  i6176.stringParameter = i6177[3]
  request.r(i6177[4], i6177[5], 0, i6176, 'objectReferenceParameter')
  i6176.time = i6177[6]
  return i6176
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds"] = function (request, data, root) {
  var i6178 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds' )
  var i6179 = data
  i6178.center = new pc.Vec3( i6179[0], i6179[1], i6179[2] )
  i6178.extends = new pc.Vec3( i6179[3], i6179[4], i6179[5] )
  return i6178
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant"] = function (request, data, root) {
  var i6182 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant' )
  var i6183 = data
  var i6185 = i6183[0]
  var i6184 = []
  for(var i = 0; i < i6185.length; i += 1) {
    i6184.push( i6185[i + 0] );
  }
  i6182.genericBindings = i6184
  var i6187 = i6183[1]
  var i6186 = []
  for(var i = 0; i < i6187.length; i += 1) {
    i6186.push( i6187[i + 0] );
  }
  i6182.pptrCurveMapping = i6186
  return i6182
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i6188 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i6189 = data
  i6188.name = i6189[0]
  i6188.ascent = i6189[1]
  i6188.originalLineHeight = i6189[2]
  i6188.fontSize = i6189[3]
  var i6191 = i6189[4]
  var i6190 = []
  for(var i = 0; i < i6191.length; i += 1) {
    i6190.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i6191[i + 0]) );
  }
  i6188.characterInfo = i6190
  request.r(i6189[5], i6189[6], 0, i6188, 'texture')
  i6188.originalFontSize = i6189[7]
  return i6188
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i6194 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i6195 = data
  i6194.index = i6195[0]
  i6194.advance = i6195[1]
  i6194.bearing = i6195[2]
  i6194.glyphWidth = i6195[3]
  i6194.glyphHeight = i6195[4]
  i6194.minX = i6195[5]
  i6194.maxX = i6195[6]
  i6194.minY = i6195[7]
  i6194.maxY = i6195[8]
  i6194.uvBottomLeftX = i6195[9]
  i6194.uvBottomLeftY = i6195[10]
  i6194.uvBottomRightX = i6195[11]
  i6194.uvBottomRightY = i6195[12]
  i6194.uvTopLeftX = i6195[13]
  i6194.uvTopLeftY = i6195[14]
  i6194.uvTopRightX = i6195[15]
  i6194.uvTopRightY = i6195[16]
  return i6194
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController"] = function (request, data, root) {
  var i6196 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController' )
  var i6197 = data
  i6196.name = i6197[0]
  var i6199 = i6197[1]
  var i6198 = []
  for(var i = 0; i < i6199.length; i += 1) {
    i6198.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer', i6199[i + 0]) );
  }
  i6196.layers = i6198
  var i6201 = i6197[2]
  var i6200 = []
  for(var i = 0; i < i6201.length; i += 1) {
    i6200.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter', i6201[i + 0]) );
  }
  i6196.parameters = i6200
  i6196.animationClips = i6197[3]
  i6196.avatarUnsupported = i6197[4]
  return i6196
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer"] = function (request, data, root) {
  var i6204 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer' )
  var i6205 = data
  i6204.name = i6205[0]
  i6204.defaultWeight = i6205[1]
  i6204.blendingMode = i6205[2]
  i6204.avatarMask = i6205[3]
  i6204.syncedLayerIndex = i6205[4]
  i6204.syncedLayerAffectsTiming = !!i6205[5]
  i6204.syncedLayers = i6205[6]
  i6204.stateMachine = request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i6205[7], i6204.stateMachine)
  return i6204
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine"] = function (request, data, root) {
  var i6206 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine' )
  var i6207 = data
  i6206.id = i6207[0]
  i6206.name = i6207[1]
  i6206.path = i6207[2]
  var i6209 = i6207[3]
  var i6208 = []
  for(var i = 0; i < i6209.length; i += 1) {
    i6208.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState', i6209[i + 0]) );
  }
  i6206.states = i6208
  var i6211 = i6207[4]
  var i6210 = []
  for(var i = 0; i < i6211.length; i += 1) {
    i6210.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i6211[i + 0]) );
  }
  i6206.machines = i6210
  var i6213 = i6207[5]
  var i6212 = []
  for(var i = 0; i < i6213.length; i += 1) {
    i6212.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i6213[i + 0]) );
  }
  i6206.entryStateTransitions = i6212
  var i6215 = i6207[6]
  var i6214 = []
  for(var i = 0; i < i6215.length; i += 1) {
    i6214.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i6215[i + 0]) );
  }
  i6206.exitStateTransitions = i6214
  var i6217 = i6207[7]
  var i6216 = []
  for(var i = 0; i < i6217.length; i += 1) {
    i6216.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i6217[i + 0]) );
  }
  i6206.anyStateTransitions = i6216
  i6206.defaultStateId = i6207[8]
  return i6206
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState"] = function (request, data, root) {
  var i6220 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState' )
  var i6221 = data
  i6220.id = i6221[0]
  i6220.name = i6221[1]
  i6220.cycleOffset = i6221[2]
  i6220.cycleOffsetParameter = i6221[3]
  i6220.cycleOffsetParameterActive = !!i6221[4]
  i6220.mirror = !!i6221[5]
  i6220.mirrorParameter = i6221[6]
  i6220.mirrorParameterActive = !!i6221[7]
  i6220.motionId = i6221[8]
  i6220.nameHash = i6221[9]
  i6220.fullPathHash = i6221[10]
  i6220.speed = i6221[11]
  i6220.speedParameter = i6221[12]
  i6220.speedParameterActive = !!i6221[13]
  i6220.tag = i6221[14]
  i6220.tagHash = i6221[15]
  i6220.writeDefaultValues = !!i6221[16]
  var i6223 = i6221[17]
  var i6222 = []
  for(var i = 0; i < i6223.length; i += 2) {
  request.r(i6223[i + 0], i6223[i + 1], 2, i6222, '')
  }
  i6220.behaviours = i6222
  var i6225 = i6221[18]
  var i6224 = []
  for(var i = 0; i < i6225.length; i += 1) {
    i6224.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i6225[i + 0]) );
  }
  i6220.transitions = i6224
  return i6220
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition"] = function (request, data, root) {
  var i6230 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition' )
  var i6231 = data
  i6230.fullPath = i6231[0]
  i6230.canTransitionToSelf = !!i6231[1]
  i6230.duration = i6231[2]
  i6230.exitTime = i6231[3]
  i6230.hasExitTime = !!i6231[4]
  i6230.hasFixedDuration = !!i6231[5]
  i6230.interruptionSource = i6231[6]
  i6230.offset = i6231[7]
  i6230.orderedInterruption = !!i6231[8]
  i6230.destinationStateId = i6231[9]
  i6230.isExit = !!i6231[10]
  i6230.mute = !!i6231[11]
  i6230.solo = !!i6231[12]
  var i6233 = i6231[13]
  var i6232 = []
  for(var i = 0; i < i6233.length; i += 1) {
    i6232.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i6233[i + 0]) );
  }
  i6230.conditions = i6232
  return i6230
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition"] = function (request, data, root) {
  var i6238 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition' )
  var i6239 = data
  i6238.destinationStateId = i6239[0]
  i6238.isExit = !!i6239[1]
  i6238.mute = !!i6239[2]
  i6238.solo = !!i6239[3]
  var i6241 = i6239[4]
  var i6240 = []
  for(var i = 0; i < i6241.length; i += 1) {
    i6240.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i6241[i + 0]) );
  }
  i6238.conditions = i6240
  return i6238
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter"] = function (request, data, root) {
  var i6244 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter' )
  var i6245 = data
  i6244.defaultBool = !!i6245[0]
  i6244.defaultFloat = i6245[1]
  i6244.defaultInt = i6245[2]
  i6244.name = i6245[3]
  i6244.nameHash = i6245[4]
  i6244.type = i6245[5]
  return i6244
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i6246 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i6247 = data
  i6246.name = i6247[0]
  i6246.bytes64 = i6247[1]
  i6246.data = i6247[2]
  return i6246
}

Deserializers["Spine.Unity.SkeletonDataAsset"] = function (request, data, root) {
  var i6248 = root || request.c( 'Spine.Unity.SkeletonDataAsset' )
  var i6249 = data
  var i6251 = i6249[0]
  var i6250 = []
  for(var i = 0; i < i6251.length; i += 2) {
  request.r(i6251[i + 0], i6251[i + 1], 2, i6250, '')
  }
  i6248.atlasAssets = i6250
  i6248.scale = i6249[1]
  request.r(i6249[2], i6249[3], 0, i6248, 'skeletonJSON')
  i6248.isUpgradingBlendModeMaterials = !!i6249[4]
  i6248.blendModeMaterials = request.d('Spine.Unity.BlendModeMaterials', i6249[5], i6248.blendModeMaterials)
  var i6253 = i6249[6]
  var i6252 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.SkeletonDataModifierAsset')))
  for(var i = 0; i < i6253.length; i += 2) {
  request.r(i6253[i + 0], i6253[i + 1], 1, i6252, '')
  }
  i6248.skeletonDataModifiers = i6252
  var i6255 = i6249[7]
  var i6254 = []
  for(var i = 0; i < i6255.length; i += 1) {
    i6254.push( i6255[i + 0] );
  }
  i6248.fromAnimation = i6254
  var i6257 = i6249[8]
  var i6256 = []
  for(var i = 0; i < i6257.length; i += 1) {
    i6256.push( i6257[i + 0] );
  }
  i6248.toAnimation = i6256
  i6248.duration = i6249[9]
  i6248.defaultMix = i6249[10]
  request.r(i6249[11], i6249[12], 0, i6248, 'controller')
  return i6248
}

Deserializers["Spine.Unity.BlendModeMaterials"] = function (request, data, root) {
  var i6260 = root || request.c( 'Spine.Unity.BlendModeMaterials' )
  var i6261 = data
  i6260.applyAdditiveMaterial = !!i6261[0]
  var i6263 = i6261[1]
  var i6262 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.BlendModeMaterials+ReplacementMaterial')))
  for(var i = 0; i < i6263.length; i += 1) {
    i6262.add(request.d('Spine.Unity.BlendModeMaterials+ReplacementMaterial', i6263[i + 0]));
  }
  i6260.additiveMaterials = i6262
  var i6265 = i6261[2]
  var i6264 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.BlendModeMaterials+ReplacementMaterial')))
  for(var i = 0; i < i6265.length; i += 1) {
    i6264.add(request.d('Spine.Unity.BlendModeMaterials+ReplacementMaterial', i6265[i + 0]));
  }
  i6260.multiplyMaterials = i6264
  var i6267 = i6261[3]
  var i6266 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.BlendModeMaterials+ReplacementMaterial')))
  for(var i = 0; i < i6267.length; i += 1) {
    i6266.add(request.d('Spine.Unity.BlendModeMaterials+ReplacementMaterial', i6267[i + 0]));
  }
  i6260.screenMaterials = i6266
  i6260.requiresBlendModeMaterials = !!i6261[4]
  return i6260
}

Deserializers["Spine.Unity.BlendModeMaterials+ReplacementMaterial"] = function (request, data, root) {
  var i6270 = root || request.c( 'Spine.Unity.BlendModeMaterials+ReplacementMaterial' )
  var i6271 = data
  i6270.pageName = i6271[0]
  request.r(i6271[1], i6271[2], 0, i6270, 'material')
  return i6270
}

Deserializers["Spine.Unity.SpineAtlasAsset"] = function (request, data, root) {
  var i6274 = root || request.c( 'Spine.Unity.SpineAtlasAsset' )
  var i6275 = data
  request.r(i6275[0], i6275[1], 0, i6274, 'atlasFile')
  var i6277 = i6275[2]
  var i6276 = []
  for(var i = 0; i < i6277.length; i += 2) {
  request.r(i6277[i + 0], i6277[i + 1], 2, i6276, '')
  }
  i6274.materials = i6276
  i6274.textureLoadingMode = i6275[3]
  request.r(i6275[4], i6275[5], 0, i6274, 'onDemandTextureLoader')
  return i6274
}

Deserializers["SlotDataSO"] = function (request, data, root) {
  var i6278 = root || request.c( 'SlotDataSO' )
  var i6279 = data
  i6278.slotName = i6279[0]
  request.r(i6279[1], i6279[2], 0, i6278, 'leftItemSprite')
  request.r(i6279[3], i6279[4], 0, i6278, 'rightItemSprite')
  return i6278
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i6280 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i6281 = data
  i6280.normalStyle = i6281[0]
  i6280.normalSpacingOffset = i6281[1]
  i6280.boldStyle = i6281[2]
  i6280.boldSpacing = i6281[3]
  i6280.italicStyle = i6281[4]
  i6280.tabSize = i6281[5]
  request.r(i6281[6], i6281[7], 0, i6280, 'atlas')
  i6280.m_SourceFontFileGUID = i6281[8]
  i6280.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i6281[9], i6280.m_CreationSettings)
  request.r(i6281[10], i6281[11], 0, i6280, 'm_SourceFontFile')
  i6280.m_SourceFontFilePath = i6281[12]
  i6280.m_AtlasPopulationMode = i6281[13]
  i6280.InternalDynamicOS = !!i6281[14]
  var i6283 = i6281[15]
  var i6282 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i6283.length; i += 1) {
    i6282.add(request.d('UnityEngine.TextCore.Glyph', i6283[i + 0]));
  }
  i6280.m_GlyphTable = i6282
  var i6285 = i6281[16]
  var i6284 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i6285.length; i += 1) {
    i6284.add(request.d('TMPro.TMP_Character', i6285[i + 0]));
  }
  i6280.m_CharacterTable = i6284
  var i6287 = i6281[17]
  var i6286 = []
  for(var i = 0; i < i6287.length; i += 2) {
  request.r(i6287[i + 0], i6287[i + 1], 2, i6286, '')
  }
  i6280.m_AtlasTextures = i6286
  i6280.m_AtlasTextureIndex = i6281[18]
  i6280.m_IsMultiAtlasTexturesEnabled = !!i6281[19]
  i6280.m_GetFontFeatures = !!i6281[20]
  i6280.m_ClearDynamicDataOnBuild = !!i6281[21]
  i6280.m_AtlasWidth = i6281[22]
  i6280.m_AtlasHeight = i6281[23]
  i6280.m_AtlasPadding = i6281[24]
  i6280.m_AtlasRenderMode = i6281[25]
  var i6289 = i6281[26]
  var i6288 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i6289.length; i += 1) {
    i6288.add(request.d('UnityEngine.TextCore.GlyphRect', i6289[i + 0]));
  }
  i6280.m_UsedGlyphRects = i6288
  var i6291 = i6281[27]
  var i6290 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i6291.length; i += 1) {
    i6290.add(request.d('UnityEngine.TextCore.GlyphRect', i6291[i + 0]));
  }
  i6280.m_FreeGlyphRects = i6290
  i6280.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i6281[28], i6280.m_FontFeatureTable)
  i6280.m_ShouldReimportFontFeatures = !!i6281[29]
  var i6293 = i6281[30]
  var i6292 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i6293.length; i += 2) {
  request.r(i6293[i + 0], i6293[i + 1], 1, i6292, '')
  }
  i6280.m_FallbackFontAssetTable = i6292
  var i6295 = i6281[31]
  var i6294 = []
  for(var i = 0; i < i6295.length; i += 1) {
    i6294.push( request.d('TMPro.TMP_FontWeightPair', i6295[i + 0]) );
  }
  i6280.m_FontWeightTable = i6294
  var i6297 = i6281[32]
  var i6296 = []
  for(var i = 0; i < i6297.length; i += 1) {
    i6296.push( request.d('TMPro.TMP_FontWeightPair', i6297[i + 0]) );
  }
  i6280.fontWeights = i6296
  i6280.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i6281[33], i6280.m_fontInfo)
  var i6299 = i6281[34]
  var i6298 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i6299.length; i += 1) {
    i6298.add(request.d('TMPro.TMP_Glyph', i6299[i + 0]));
  }
  i6280.m_glyphInfoList = i6298
  i6280.m_KerningTable = request.d('TMPro.KerningTable', i6281[35], i6280.m_KerningTable)
  var i6301 = i6281[36]
  var i6300 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i6301.length; i += 2) {
  request.r(i6301[i + 0], i6301[i + 1], 1, i6300, '')
  }
  i6280.fallbackFontAssets = i6300
  i6280.m_Version = i6281[37]
  i6280.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i6281[38], i6280.m_FaceInfo)
  request.r(i6281[39], i6281[40], 0, i6280, 'm_Material')
  return i6280
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i6302 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i6303 = data
  i6302.sourceFontFileName = i6303[0]
  i6302.sourceFontFileGUID = i6303[1]
  i6302.faceIndex = i6303[2]
  i6302.pointSizeSamplingMode = i6303[3]
  i6302.pointSize = i6303[4]
  i6302.padding = i6303[5]
  i6302.paddingMode = i6303[6]
  i6302.packingMode = i6303[7]
  i6302.atlasWidth = i6303[8]
  i6302.atlasHeight = i6303[9]
  i6302.characterSetSelectionMode = i6303[10]
  i6302.characterSequence = i6303[11]
  i6302.referencedFontAssetGUID = i6303[12]
  i6302.referencedTextAssetGUID = i6303[13]
  i6302.fontStyle = i6303[14]
  i6302.fontStyleModifier = i6303[15]
  i6302.renderMode = i6303[16]
  i6302.includeFontFeatures = !!i6303[17]
  return i6302
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i6306 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i6307 = data
  i6306.m_Index = i6307[0]
  i6306.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i6307[1], i6306.m_Metrics)
  i6306.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i6307[2], i6306.m_GlyphRect)
  i6306.m_Scale = i6307[3]
  i6306.m_AtlasIndex = i6307[4]
  i6306.m_ClassDefinitionType = i6307[5]
  return i6306
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i6308 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i6309 = data
  i6308.m_Width = i6309[0]
  i6308.m_Height = i6309[1]
  i6308.m_HorizontalBearingX = i6309[2]
  i6308.m_HorizontalBearingY = i6309[3]
  i6308.m_HorizontalAdvance = i6309[4]
  return i6308
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i6310 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i6311 = data
  i6310.m_X = i6311[0]
  i6310.m_Y = i6311[1]
  i6310.m_Width = i6311[2]
  i6310.m_Height = i6311[3]
  return i6310
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i6314 = root || request.c( 'TMPro.TMP_Character' )
  var i6315 = data
  i6314.m_ElementType = i6315[0]
  i6314.m_Unicode = i6315[1]
  i6314.m_GlyphIndex = i6315[2]
  i6314.m_Scale = i6315[3]
  return i6314
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i6320 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i6321 = data
  var i6323 = i6321[0]
  var i6322 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i6323.length; i += 1) {
    i6322.add(request.d('TMPro.MultipleSubstitutionRecord', i6323[i + 0]));
  }
  i6320.m_MultipleSubstitutionRecords = i6322
  var i6325 = i6321[1]
  var i6324 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i6325.length; i += 1) {
    i6324.add(request.d('TMPro.LigatureSubstitutionRecord', i6325[i + 0]));
  }
  i6320.m_LigatureSubstitutionRecords = i6324
  var i6327 = i6321[2]
  var i6326 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i6327.length; i += 1) {
    i6326.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i6327[i + 0]));
  }
  i6320.m_GlyphPairAdjustmentRecords = i6326
  var i6329 = i6321[3]
  var i6328 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i6329.length; i += 1) {
    i6328.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i6329[i + 0]));
  }
  i6320.m_MarkToBaseAdjustmentRecords = i6328
  var i6331 = i6321[4]
  var i6330 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i6331.length; i += 1) {
    i6330.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i6331[i + 0]));
  }
  i6320.m_MarkToMarkAdjustmentRecords = i6330
  return i6320
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i6334 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i6335 = data
  i6334.m_TargetGlyphID = i6335[0]
  i6334.m_SubstituteGlyphIDs = i6335[1]
  return i6334
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i6338 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i6339 = data
  i6338.m_ComponentGlyphIDs = i6339[0]
  i6338.m_LigatureGlyphID = i6339[1]
  return i6338
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i6342 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i6343 = data
  i6342.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i6343[0], i6342.m_FirstAdjustmentRecord)
  i6342.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i6343[1], i6342.m_SecondAdjustmentRecord)
  i6342.m_FeatureLookupFlags = i6343[2]
  return i6342
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i6344 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i6345 = data
  i6344.m_GlyphIndex = i6345[0]
  i6344.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i6345[1], i6344.m_GlyphValueRecord)
  return i6344
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i6346 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i6347 = data
  i6346.m_XPlacement = i6347[0]
  i6346.m_YPlacement = i6347[1]
  i6346.m_XAdvance = i6347[2]
  i6346.m_YAdvance = i6347[3]
  return i6346
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i6350 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i6351 = data
  i6350.m_BaseGlyphID = i6351[0]
  i6350.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i6351[1], i6350.m_BaseGlyphAnchorPoint)
  i6350.m_MarkGlyphID = i6351[2]
  i6350.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i6351[3], i6350.m_MarkPositionAdjustment)
  return i6350
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i6354 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i6355 = data
  i6354.m_BaseMarkGlyphID = i6355[0]
  i6354.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i6355[1], i6354.m_BaseMarkGlyphAnchorPoint)
  i6354.m_CombiningMarkGlyphID = i6355[2]
  i6354.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i6355[3], i6354.m_CombiningMarkPositionAdjustment)
  return i6354
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i6360 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i6361 = data
  request.r(i6361[0], i6361[1], 0, i6360, 'regularTypeface')
  request.r(i6361[2], i6361[3], 0, i6360, 'italicTypeface')
  return i6360
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i6362 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i6363 = data
  i6362.Name = i6363[0]
  i6362.PointSize = i6363[1]
  i6362.Scale = i6363[2]
  i6362.CharacterCount = i6363[3]
  i6362.LineHeight = i6363[4]
  i6362.Baseline = i6363[5]
  i6362.Ascender = i6363[6]
  i6362.CapHeight = i6363[7]
  i6362.Descender = i6363[8]
  i6362.CenterLine = i6363[9]
  i6362.SuperscriptOffset = i6363[10]
  i6362.SubscriptOffset = i6363[11]
  i6362.SubSize = i6363[12]
  i6362.Underline = i6363[13]
  i6362.UnderlineThickness = i6363[14]
  i6362.strikethrough = i6363[15]
  i6362.strikethroughThickness = i6363[16]
  i6362.TabWidth = i6363[17]
  i6362.Padding = i6363[18]
  i6362.AtlasWidth = i6363[19]
  i6362.AtlasHeight = i6363[20]
  return i6362
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i6366 = root || request.c( 'TMPro.TMP_Glyph' )
  var i6367 = data
  i6366.id = i6367[0]
  i6366.x = i6367[1]
  i6366.y = i6367[2]
  i6366.width = i6367[3]
  i6366.height = i6367[4]
  i6366.xOffset = i6367[5]
  i6366.yOffset = i6367[6]
  i6366.xAdvance = i6367[7]
  i6366.scale = i6367[8]
  return i6366
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i6368 = root || request.c( 'TMPro.KerningTable' )
  var i6369 = data
  var i6371 = i6369[0]
  var i6370 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i6371.length; i += 1) {
    i6370.add(request.d('TMPro.KerningPair', i6371[i + 0]));
  }
  i6368.kerningPairs = i6370
  return i6368
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i6374 = root || request.c( 'TMPro.KerningPair' )
  var i6375 = data
  i6374.xOffset = i6375[0]
  i6374.m_FirstGlyph = i6375[1]
  i6374.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i6375[2], i6374.m_FirstGlyphAdjustments)
  i6374.m_SecondGlyph = i6375[3]
  i6374.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i6375[4], i6374.m_SecondGlyphAdjustments)
  i6374.m_IgnoreSpacingAdjustments = !!i6375[5]
  return i6374
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i6376 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i6377 = data
  i6376.m_FaceIndex = i6377[0]
  i6376.m_FamilyName = i6377[1]
  i6376.m_StyleName = i6377[2]
  i6376.m_PointSize = i6377[3]
  i6376.m_Scale = i6377[4]
  i6376.m_UnitsPerEM = i6377[5]
  i6376.m_LineHeight = i6377[6]
  i6376.m_AscentLine = i6377[7]
  i6376.m_CapLine = i6377[8]
  i6376.m_MeanLine = i6377[9]
  i6376.m_Baseline = i6377[10]
  i6376.m_DescentLine = i6377[11]
  i6376.m_SuperscriptOffset = i6377[12]
  i6376.m_SuperscriptSize = i6377[13]
  i6376.m_SubscriptOffset = i6377[14]
  i6376.m_SubscriptSize = i6377[15]
  i6376.m_UnderlineOffset = i6377[16]
  i6376.m_UnderlineThickness = i6377[17]
  i6376.m_StrikethroughOffset = i6377[18]
  i6376.m_StrikethroughThickness = i6377[19]
  i6376.m_TabWidth = i6377[20]
  return i6376
}

Deserializers["EquipmentSetData"] = function (request, data, root) {
  var i6378 = root || request.c( 'EquipmentSetData' )
  var i6379 = data
  request.r(i6379[0], i6379[1], 0, i6378, 'targetSkeletonDataAsset')
  var i6381 = i6379[2]
  var i6380 = new (System.Collections.Generic.List$1(Bridge.ns('System.String')))
  for(var i = 0; i < i6381.length; i += 1) {
    i6380.add(i6381[i + 0]);
  }
  i6378.skinNames = i6380
  return i6378
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i6382 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i6383 = data
  i6382.useSafeMode = !!i6383[0]
  i6382.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i6383[1], i6382.safeModeOptions)
  i6382.timeScale = i6383[2]
  i6382.unscaledTimeScale = i6383[3]
  i6382.useSmoothDeltaTime = !!i6383[4]
  i6382.maxSmoothUnscaledTime = i6383[5]
  i6382.rewindCallbackMode = i6383[6]
  i6382.showUnityEditorReport = !!i6383[7]
  i6382.logBehaviour = i6383[8]
  i6382.drawGizmos = !!i6383[9]
  i6382.defaultRecyclable = !!i6383[10]
  i6382.defaultAutoPlay = i6383[11]
  i6382.defaultUpdateType = i6383[12]
  i6382.defaultTimeScaleIndependent = !!i6383[13]
  i6382.defaultEaseType = i6383[14]
  i6382.defaultEaseOvershootOrAmplitude = i6383[15]
  i6382.defaultEasePeriod = i6383[16]
  i6382.defaultAutoKill = !!i6383[17]
  i6382.defaultLoopType = i6383[18]
  i6382.debugMode = !!i6383[19]
  i6382.debugStoreTargetId = !!i6383[20]
  i6382.showPreviewPanel = !!i6383[21]
  i6382.storeSettingsLocation = i6383[22]
  i6382.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i6383[23], i6382.modules)
  i6382.createASMDEF = !!i6383[24]
  i6382.showPlayingTweens = !!i6383[25]
  i6382.showPausedTweens = !!i6383[26]
  return i6382
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i6384 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i6385 = data
  i6384.logBehaviour = i6385[0]
  i6384.nestedTweenFailureBehaviour = i6385[1]
  return i6384
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i6386 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i6387 = data
  i6386.showPanel = !!i6387[0]
  i6386.audioEnabled = !!i6387[1]
  i6386.physicsEnabled = !!i6387[2]
  i6386.physics2DEnabled = !!i6387[3]
  i6386.spriteEnabled = !!i6387[4]
  i6386.uiEnabled = !!i6387[5]
  i6386.uiToolkitEnabled = !!i6387[6]
  i6386.textMeshProEnabled = !!i6387[7]
  i6386.tk2DEnabled = !!i6387[8]
  i6386.deAudioEnabled = !!i6387[9]
  i6386.deUnityExtendedEnabled = !!i6387[10]
  i6386.epoOutlineEnabled = !!i6387[11]
  return i6386
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i6388 = root || request.c( 'TMPro.TMP_Settings' )
  var i6389 = data
  i6388.assetVersion = i6389[0]
  i6388.m_TextWrappingMode = i6389[1]
  i6388.m_enableKerning = !!i6389[2]
  var i6391 = i6389[3]
  var i6390 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i6391.length; i += 1) {
    i6390.add(i6391[i + 0]);
  }
  i6388.m_ActiveFontFeatures = i6390
  i6388.m_enableExtraPadding = !!i6389[4]
  i6388.m_enableTintAllSprites = !!i6389[5]
  i6388.m_enableParseEscapeCharacters = !!i6389[6]
  i6388.m_EnableRaycastTarget = !!i6389[7]
  i6388.m_GetFontFeaturesAtRuntime = !!i6389[8]
  i6388.m_missingGlyphCharacter = i6389[9]
  i6388.m_ClearDynamicDataOnBuild = !!i6389[10]
  i6388.m_warningsDisabled = !!i6389[11]
  request.r(i6389[12], i6389[13], 0, i6388, 'm_defaultFontAsset')
  i6388.m_defaultFontAssetPath = i6389[14]
  i6388.m_defaultFontSize = i6389[15]
  i6388.m_defaultAutoSizeMinRatio = i6389[16]
  i6388.m_defaultAutoSizeMaxRatio = i6389[17]
  i6388.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i6389[18], i6389[19] )
  i6388.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i6389[20], i6389[21] )
  i6388.m_autoSizeTextContainer = !!i6389[22]
  i6388.m_IsTextObjectScaleStatic = !!i6389[23]
  var i6393 = i6389[24]
  var i6392 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i6393.length; i += 2) {
  request.r(i6393[i + 0], i6393[i + 1], 1, i6392, '')
  }
  i6388.m_fallbackFontAssets = i6392
  i6388.m_matchMaterialPreset = !!i6389[25]
  i6388.m_HideSubTextObjects = !!i6389[26]
  request.r(i6389[27], i6389[28], 0, i6388, 'm_defaultSpriteAsset')
  i6388.m_defaultSpriteAssetPath = i6389[29]
  i6388.m_enableEmojiSupport = !!i6389[30]
  i6388.m_MissingCharacterSpriteUnicode = i6389[31]
  var i6395 = i6389[32]
  var i6394 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i6395.length; i += 2) {
  request.r(i6395[i + 0], i6395[i + 1], 1, i6394, '')
  }
  i6388.m_EmojiFallbackTextAssets = i6394
  i6388.m_defaultColorGradientPresetsPath = i6389[33]
  request.r(i6389[34], i6389[35], 0, i6388, 'm_defaultStyleSheet')
  i6388.m_StyleSheetsResourcePath = i6389[36]
  request.r(i6389[37], i6389[38], 0, i6388, 'm_leadingCharacters')
  request.r(i6389[39], i6389[40], 0, i6388, 'm_followingCharacters')
  i6388.m_UseModernHangulLineBreakingRules = !!i6389[41]
  return i6388
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i6398 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i6399 = data
  request.r(i6399[0], i6399[1], 0, i6398, 'spriteSheet')
  var i6401 = i6399[2]
  var i6400 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i6401.length; i += 1) {
    i6400.add(request.d('TMPro.TMP_Sprite', i6401[i + 0]));
  }
  i6398.spriteInfoList = i6400
  var i6403 = i6399[3]
  var i6402 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i6403.length; i += 2) {
  request.r(i6403[i + 0], i6403[i + 1], 1, i6402, '')
  }
  i6398.fallbackSpriteAssets = i6402
  var i6405 = i6399[4]
  var i6404 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i6405.length; i += 1) {
    i6404.add(request.d('TMPro.TMP_SpriteCharacter', i6405[i + 0]));
  }
  i6398.m_SpriteCharacterTable = i6404
  var i6407 = i6399[5]
  var i6406 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i6407.length; i += 1) {
    i6406.add(request.d('TMPro.TMP_SpriteGlyph', i6407[i + 0]));
  }
  i6398.m_GlyphTable = i6406
  i6398.m_Version = i6399[6]
  i6398.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i6399[7], i6398.m_FaceInfo)
  request.r(i6399[8], i6399[9], 0, i6398, 'm_Material')
  return i6398
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i6410 = root || request.c( 'TMPro.TMP_Sprite' )
  var i6411 = data
  i6410.name = i6411[0]
  i6410.hashCode = i6411[1]
  i6410.unicode = i6411[2]
  i6410.pivot = new pc.Vec2( i6411[3], i6411[4] )
  request.r(i6411[5], i6411[6], 0, i6410, 'sprite')
  i6410.id = i6411[7]
  i6410.x = i6411[8]
  i6410.y = i6411[9]
  i6410.width = i6411[10]
  i6410.height = i6411[11]
  i6410.xOffset = i6411[12]
  i6410.yOffset = i6411[13]
  i6410.xAdvance = i6411[14]
  i6410.scale = i6411[15]
  return i6410
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i6416 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i6417 = data
  i6416.m_Name = i6417[0]
  i6416.m_ElementType = i6417[1]
  i6416.m_Unicode = i6417[2]
  i6416.m_GlyphIndex = i6417[3]
  i6416.m_Scale = i6417[4]
  return i6416
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i6420 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i6421 = data
  request.r(i6421[0], i6421[1], 0, i6420, 'sprite')
  i6420.m_Index = i6421[2]
  i6420.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i6421[3], i6420.m_Metrics)
  i6420.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i6421[4], i6420.m_GlyphRect)
  i6420.m_Scale = i6421[5]
  i6420.m_AtlasIndex = i6421[6]
  i6420.m_ClassDefinitionType = i6421[7]
  return i6420
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i6422 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i6423 = data
  var i6425 = i6423[0]
  var i6424 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i6425.length; i += 1) {
    i6424.add(request.d('TMPro.TMP_Style', i6425[i + 0]));
  }
  i6422.m_StyleList = i6424
  return i6422
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i6428 = root || request.c( 'TMPro.TMP_Style' )
  var i6429 = data
  i6428.m_Name = i6429[0]
  i6428.m_HashCode = i6429[1]
  i6428.m_OpeningDefinition = i6429[2]
  i6428.m_ClosingDefinition = i6429[3]
  i6428.m_OpeningTagArray = i6429[4]
  i6428.m_ClosingTagArray = i6429[5]
  return i6428
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i6430 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i6431 = data
  var i6433 = i6431[0]
  var i6432 = []
  for(var i = 0; i < i6433.length; i += 1) {
    i6432.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i6433[i + 0]) );
  }
  i6430.files = i6432
  i6430.componentToPrefabIds = i6431[1]
  return i6430
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i6436 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i6437 = data
  i6436.path = i6437[0]
  request.r(i6437[1], i6437[2], 0, i6436, 'unityObject')
  return i6436
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i6438 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i6439 = data
  var i6441 = i6439[0]
  var i6440 = []
  for(var i = 0; i < i6441.length; i += 1) {
    i6440.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i6441[i + 0]) );
  }
  i6438.scriptsExecutionOrder = i6440
  var i6443 = i6439[1]
  var i6442 = []
  for(var i = 0; i < i6443.length; i += 1) {
    i6442.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i6443[i + 0]) );
  }
  i6438.sortingLayers = i6442
  var i6445 = i6439[2]
  var i6444 = []
  for(var i = 0; i < i6445.length; i += 1) {
    i6444.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i6445[i + 0]) );
  }
  i6438.cullingLayers = i6444
  i6438.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i6439[3], i6438.timeSettings)
  i6438.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i6439[4], i6438.physicsSettings)
  i6438.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i6439[5], i6438.physics2DSettings)
  i6438.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i6439[6], i6438.qualitySettings)
  i6438.enableRealtimeShadows = !!i6439[7]
  i6438.enableAutoInstancing = !!i6439[8]
  i6438.enableStaticBatching = !!i6439[9]
  i6438.enableDynamicBatching = !!i6439[10]
  i6438.lightmapEncodingQuality = i6439[11]
  i6438.desiredColorSpace = i6439[12]
  var i6447 = i6439[13]
  var i6446 = []
  for(var i = 0; i < i6447.length; i += 1) {
    i6446.push( i6447[i + 0] );
  }
  i6438.allTags = i6446
  return i6438
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i6450 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i6451 = data
  i6450.name = i6451[0]
  i6450.value = i6451[1]
  return i6450
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i6454 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i6455 = data
  i6454.id = i6455[0]
  i6454.name = i6455[1]
  i6454.value = i6455[2]
  return i6454
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i6458 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i6459 = data
  i6458.id = i6459[0]
  i6458.name = i6459[1]
  return i6458
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i6460 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i6461 = data
  i6460.fixedDeltaTime = i6461[0]
  i6460.maximumDeltaTime = i6461[1]
  i6460.timeScale = i6461[2]
  i6460.maximumParticleTimestep = i6461[3]
  return i6460
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i6462 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i6463 = data
  i6462.gravity = new pc.Vec3( i6463[0], i6463[1], i6463[2] )
  i6462.defaultSolverIterations = i6463[3]
  i6462.bounceThreshold = i6463[4]
  i6462.autoSyncTransforms = !!i6463[5]
  i6462.autoSimulation = !!i6463[6]
  var i6465 = i6463[7]
  var i6464 = []
  for(var i = 0; i < i6465.length; i += 1) {
    i6464.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i6465[i + 0]) );
  }
  i6462.collisionMatrix = i6464
  return i6462
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i6468 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i6469 = data
  i6468.enabled = !!i6469[0]
  i6468.layerId = i6469[1]
  i6468.otherLayerId = i6469[2]
  return i6468
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i6470 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i6471 = data
  request.r(i6471[0], i6471[1], 0, i6470, 'material')
  i6470.gravity = new pc.Vec2( i6471[2], i6471[3] )
  i6470.positionIterations = i6471[4]
  i6470.velocityIterations = i6471[5]
  i6470.velocityThreshold = i6471[6]
  i6470.maxLinearCorrection = i6471[7]
  i6470.maxAngularCorrection = i6471[8]
  i6470.maxTranslationSpeed = i6471[9]
  i6470.maxRotationSpeed = i6471[10]
  i6470.baumgarteScale = i6471[11]
  i6470.baumgarteTOIScale = i6471[12]
  i6470.timeToSleep = i6471[13]
  i6470.linearSleepTolerance = i6471[14]
  i6470.angularSleepTolerance = i6471[15]
  i6470.defaultContactOffset = i6471[16]
  i6470.autoSimulation = !!i6471[17]
  i6470.queriesHitTriggers = !!i6471[18]
  i6470.queriesStartInColliders = !!i6471[19]
  i6470.callbacksOnDisable = !!i6471[20]
  i6470.reuseCollisionCallbacks = !!i6471[21]
  i6470.autoSyncTransforms = !!i6471[22]
  var i6473 = i6471[23]
  var i6472 = []
  for(var i = 0; i < i6473.length; i += 1) {
    i6472.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i6473[i + 0]) );
  }
  i6470.collisionMatrix = i6472
  return i6470
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i6476 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i6477 = data
  i6476.enabled = !!i6477[0]
  i6476.layerId = i6477[1]
  i6476.otherLayerId = i6477[2]
  return i6476
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i6478 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i6479 = data
  var i6481 = i6479[0]
  var i6480 = []
  for(var i = 0; i < i6481.length; i += 1) {
    i6480.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i6481[i + 0]) );
  }
  i6478.qualityLevels = i6480
  var i6483 = i6479[1]
  var i6482 = []
  for(var i = 0; i < i6483.length; i += 1) {
    i6482.push( i6483[i + 0] );
  }
  i6478.names = i6482
  i6478.shadows = i6479[2]
  i6478.anisotropicFiltering = i6479[3]
  i6478.antiAliasing = i6479[4]
  i6478.lodBias = i6479[5]
  i6478.shadowCascades = i6479[6]
  i6478.shadowDistance = i6479[7]
  i6478.shadowmaskMode = i6479[8]
  i6478.shadowProjection = i6479[9]
  i6478.shadowResolution = i6479[10]
  i6478.softParticles = !!i6479[11]
  i6478.softVegetation = !!i6479[12]
  i6478.activeColorSpace = i6479[13]
  i6478.desiredColorSpace = i6479[14]
  i6478.masterTextureLimit = i6479[15]
  i6478.maxQueuedFrames = i6479[16]
  i6478.particleRaycastBudget = i6479[17]
  i6478.pixelLightCount = i6479[18]
  i6478.realtimeReflectionProbes = !!i6479[19]
  i6478.shadowCascade2Split = i6479[20]
  i6478.shadowCascade4Split = new pc.Vec3( i6479[21], i6479[22], i6479[23] )
  i6478.streamingMipmapsActive = !!i6479[24]
  i6478.vSyncCount = i6479[25]
  i6478.asyncUploadBufferSize = i6479[26]
  i6478.asyncUploadTimeSlice = i6479[27]
  i6478.billboardsFaceCameraPosition = !!i6479[28]
  i6478.shadowNearPlaneOffset = i6479[29]
  i6478.streamingMipmapsMemoryBudget = i6479[30]
  i6478.maximumLODLevel = i6479[31]
  i6478.streamingMipmapsAddAllCameras = !!i6479[32]
  i6478.streamingMipmapsMaxLevelReduction = i6479[33]
  i6478.streamingMipmapsRenderersPerFrame = i6479[34]
  i6478.resolutionScalingFixedDPIFactor = i6479[35]
  i6478.streamingMipmapsMaxFileIORequests = i6479[36]
  i6478.currentQualityLevel = i6479[37]
  return i6478
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i6488 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i6489 = data
  i6488.weight = i6489[0]
  i6488.vertices = i6489[1]
  i6488.normals = i6489[2]
  i6488.tangents = i6489[3]
  return i6488
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition"] = function (request, data, root) {
  var i6492 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition' )
  var i6493 = data
  i6492.mode = i6493[0]
  i6492.parameter = i6493[1]
  i6492.threshold = i6493[2]
  return i6492
}

Deserializers["TMPro.GlyphAnchorPoint"] = function (request, data, root) {
  var i6494 = root || request.c( 'TMPro.GlyphAnchorPoint' )
  var i6495 = data
  i6494.m_XCoordinate = i6495[0]
  i6494.m_YCoordinate = i6495[1]
  return i6494
}

Deserializers["TMPro.MarkPositionAdjustment"] = function (request, data, root) {
  var i6496 = root || request.c( 'TMPro.MarkPositionAdjustment' )
  var i6497 = data
  i6496.m_XPositionAdjustment = i6497[0]
  i6496.m_YPositionAdjustment = i6497[1]
  return i6496
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i6498 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i6499 = data
  i6498.xPlacement = i6499[0]
  i6498.yPlacement = i6499[1]
  i6498.xAdvance = i6499[2]
  i6498.yAdvance = i6499[3]
  return i6498
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"useSimplification":2,"useUInt32IndexFormat":3,"vertexCount":4,"aabb":5,"streams":6,"vertices":7,"subMeshes":8,"bindposes":9,"blendShapes":10},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Components.Transform":{"position":0,"scale":3,"rotation":6},"Luna.Unity.DTO.UnityEngine.Components.Animator":{"animatorController":0,"avatar":2,"updateMode":4,"hasTransformHierarchy":5,"applyRootMotion":6,"humanBones":7,"enabled":8},"Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer":{"color":0,"sprite":4,"flipX":6,"flipY":7,"drawMode":8,"size":9,"tileMode":11,"adaptiveModeThreshold":12,"maskInteraction":13,"spriteSortPoint":14,"enabled":15,"sharedMaterial":16,"sharedMaterials":18,"receiveShadows":19,"shadowCastingMode":20,"sortingLayerID":21,"sortingOrder":22,"lightmapIndex":23,"lightmapSceneIndex":24,"lightmapScaleOffset":25,"lightProbeUsage":29,"reflectionProbeUsage":30},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider":{"center":0,"radius":3,"height":4,"direction":5,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"referenceAmbientProbe":36,"useReferenceAmbientProbe":37,"customReflection":38,"defaultReflection":40,"defaultReflectionMode":42,"defaultReflectionResolution":43,"sunLightObjectId":44,"pixelLightCount":45,"defaultReflectionHDR":46,"hasLightDataAsset":47,"hasManualGenerate":48},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip":{"name":0,"wrapMode":1,"isLooping":2,"length":3,"curves":4,"events":5,"halfPrecision":6,"_frameRate":7,"localBounds":8,"hasMuscleCurves":9,"clipMuscleConstant":10,"clipBindingConstant":11},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve":{"path":0,"hash":1,"componentType":2,"property":3,"keys":4,"objectReferenceKeys":5},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey":{"time":0,"value":1},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent":{"functionName":0,"floatParameter":1,"intParameter":2,"stringParameter":3,"objectReferenceParameter":4,"time":6},"Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds":{"center":0,"extends":3},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant":{"genericBindings":0,"pptrCurveMapping":1},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController":{"name":0,"layers":1,"parameters":2,"animationClips":3,"avatarUnsupported":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer":{"name":0,"defaultWeight":1,"blendingMode":2,"avatarMask":3,"syncedLayerIndex":4,"syncedLayerAffectsTiming":5,"syncedLayers":6,"stateMachine":7},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine":{"id":0,"name":1,"path":2,"states":3,"machines":4,"entryStateTransitions":5,"exitStateTransitions":6,"anyStateTransitions":7,"defaultStateId":8},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState":{"id":0,"name":1,"cycleOffset":2,"cycleOffsetParameter":3,"cycleOffsetParameterActive":4,"mirror":5,"mirrorParameter":6,"mirrorParameterActive":7,"motionId":8,"nameHash":9,"fullPathHash":10,"speed":11,"speedParameter":12,"speedParameterActive":13,"tag":14,"tagHash":15,"writeDefaultValues":16,"behaviours":17,"transitions":18},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition":{"fullPath":0,"canTransitionToSelf":1,"duration":2,"exitTime":3,"hasExitTime":4,"hasFixedDuration":5,"interruptionSource":6,"offset":7,"orderedInterruption":8,"destinationStateId":9,"isExit":10,"mute":11,"solo":12,"conditions":13},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition":{"destinationStateId":0,"isExit":1,"mute":2,"solo":3,"conditions":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter":{"defaultBool":0,"defaultFloat":1,"defaultInt":2,"name":3,"nameHash":4,"type":5},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"lightmapEncodingQuality":11,"desiredColorSpace":12,"allTags":13},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition":{"mode":0,"parameter":1,"threshold":2}}

Deserializers.requiredComponents = {"47":[48],"49":[48],"50":[48],"51":[48],"52":[48],"53":[48],"54":[55],"56":[8],"57":[58],"59":[58],"60":[58],"61":[58],"62":[58],"63":[58],"64":[65],"66":[65],"67":[65],"68":[65],"69":[65],"70":[65],"71":[65],"72":[65],"73":[65],"74":[65],"75":[65],"76":[65],"77":[65],"78":[8],"79":[32],"80":[81],"82":[81],"83":[34],"11":[8],"84":[85],"86":[34],"87":[88,34],"33":[32],"89":[88,34],"90":[3,32],"91":[32],"92":[32,30],"93":[58],"94":[65],"95":[85],"96":[97],"98":[5],"99":[8],"100":[101],"102":[38],"103":[83],"104":[34],"36":[32,34],"105":[34,88],"106":[34],"107":[88,34],"108":[32],"109":[88,34],"110":[34],"111":[112],"113":[112],"114":[112],"115":[34],"116":[34],"117":[83],"118":[88,34],"119":[34],"120":[83],"121":[34],"122":[34],"123":[34],"124":[34],"125":[34],"126":[34],"127":[34],"128":[34],"129":[34],"130":[88,34],"131":[34],"132":[34],"133":[34],"134":[34],"135":[88,34],"136":[34],"137":[38],"138":[38],"39":[38],"139":[38],"140":[8],"141":[8]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Texture2D","UnityEngine.Transform","UnityEngine.Animator","UnityEditor.Animations.AnimatorController","UnityEngine.SpriteRenderer","UnityEngine.Sprite","UnityEngine.Material","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.MonoBehaviour","AutoCameraFit","CharacterManager","Character","EquipmentSetData","Spine.Unity.SkeletonDataAsset","GameManager","SlotManager","SlotSetup","UnityEngine.GameObject","Ply_Pool","Ply_SoundManager","UnityEngine.AudioClip","UnityEngine.AudioSource","ProgressTrackingManager","UnityEngine.CapsuleCollider","BalloonController","BalloonActionTrigger","SlotDataSO","ScreenHeightPositionAnchor","UnityEngine.MeshFilter","UnityEngine.Mesh","UnityEngine.MeshRenderer","Spine.Unity.SkeletonAnimation","UnityEngine.RectTransform","UnityEngine.EventSystems.UIBehaviour","TMPro.TextMeshPro","TMPro.TMP_FontAsset","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","Spine.Unity.SpineAtlasAsset","UnityEngine.TextAsset","UnityEngine.Font","DG.Tweening.Core.DOTweenSettings","TMPro.TMP_Settings","TMPro.TMP_SpriteAsset","TMPro.TMP_StyleSheet","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.SkinnedMeshRenderer","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.Canvas","Spine.Unity.EditorSkeletonPlayer","Spine.Unity.ISkeletonAnimation","Spine.Unity.BoneFollowerGraphic","Spine.Unity.SkeletonSubmeshGraphic","UnityEngine.CanvasRenderer","Spine.Unity.SkeletonGraphic","Spine.Unity.SkeletonMecanim","Spine.Unity.SkeletonRenderer","Spine.Unity.SkeletonPartsRenderer","Spine.Unity.FollowLocationRigidbody","Spine.Unity.FollowLocationRigidbody2D","Spine.Unity.SkeletonUtility","Spine.Unity.SkeletonUtilityConstraint","Spine.Unity.SkeletonUtilityBone","UnityEngine.U2D.Animation.SpriteSkin","UnityEngine.U2D.PixelPerfectCamera","UnityEngine.U2D.SpriteShapeController","UnityEngine.U2D.SpriteShapeRenderer","UnityEngine.InputSystem.UI.InputSystemUIInputModule","UnityEngine.InputSystem.UI.TrackedDeviceRaycaster","TMPro.TextContainer","TMPro.TextMeshProUGUI","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.GraphicRaycaster","UnityEngine.UI.Image","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.CanvasScaler","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.Mask","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.Scrollbar","UnityEngine.UI.ScrollRect","UnityEngine.UI.Slider","UnityEngine.UI.Text","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.38f1";

Deserializers.productName = "PLY_LeftOrRight";

Deserializers.lunaInitializationTime = "07/24/2026 10:13:04";

Deserializers.lunaDaysRunning = "3.0";

Deserializers.lunaVersion = "7.1.0";

Deserializers.lunaSHA = "cf93782349542fe0b84ad13951a26809f8419628";

Deserializers.creativeName = "";

Deserializers.lunaAppID = "27599";

Deserializers.projectId = "a6751afac85ec2744a912b2a685dda8d";

Deserializers.packagesInfo = "com.unity.inputsystem: 1.13.0\ncom.unity.timeline: 1.8.7\ncom.unity.ugui: 2.0.0";

Deserializers.externalJsLibraries = "";

Deserializers.androidLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.androidLink?window.$environment.packageConfig.androidLink:'Empty';

Deserializers.iosLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.iosLink?window.$environment.packageConfig.iosLink:'Empty';

Deserializers.base64Enabled = "True";

Deserializers.minifyEnabled = "True";

Deserializers.isForceUncompressed = "False";

Deserializers.isAntiAliasingEnabled = "True";

Deserializers.isRuntimeAnalysisEnabledForCode = "False";

Deserializers.runtimeAnalysisExcludedClassesCount = "1915";

Deserializers.runtimeAnalysisExcludedMethodsCount = "5422";

Deserializers.runtimeAnalysisExcludedModules = "physics2d, particle-system";

Deserializers.isRuntimeAnalysisEnabledForShaders = "True";

Deserializers.isRealtimeShadowsEnabled = "False";

Deserializers.isReferenceAmbientProbeBaked = "False";

Deserializers.isLunaCompilerV2Used = "False";

Deserializers.companyName = "DefaultCompany";

Deserializers.buildPlatform = "StandaloneWindows64";

Deserializers.applicationIdentifier = "com.DefaultCompany.PLY-LeftOrRight";

Deserializers.disableAntiAliasing = false;

Deserializers.graphicsConstraint = 24;

Deserializers.linearColorSpace = false;

Deserializers.buildID = "b8130653-0866-4a1a-82f9-154282815438";

Deserializers.runtimeInitializeOnLoadInfos = [[["Unity","Services","Core","Internal","UnityServicesInitializer","EnableServicesInitializationAsync"],["UnityEngine","U2D","Animation","GpuDeformationSystem","CreateFallbackBuffer"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["DG","Tweening","DOTween","RuntimeOnLoad"],["Sirenix","Utilities","UnityVersion","EnsureLoaded"],["Sirenix","Serialization","Utilities","UnityVersion","EnsureLoaded"],["Sirenix","Serialization","UnitySerializationInitializer","InitializeRuntime"],["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["Unity","Services","Core","Registration","CorePackageInitializer","InitializeOnLoad"],["Unity","Services","Core","Internal","TaskAsyncOperation","SetScheduler"],["Unity","Services","Core","Environments","Client","Scheduler","EngineStateHelper","Init"],["Unity","Services","Core","Environments","Client","Scheduler","ThreadHelper","Init"],["Ua2CoreInitializeCallback","Register"],["UnityEngine","InputSystem","InputSystem","RunInitialUpdate"],["Unity","AI","Navigation","NavMeshLink","ClearTrackedList"],["Unity","AI","Navigation","NavMeshSurface","ClearNavMeshSurfaces"],["Unity","AI","Navigation","NavMeshModifierVolume","ClearNavMeshModifiers"],["Unity","AI","Navigation","NavMeshModifier","ClearNavMeshModifiers"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["Unity","Services","Core","Internal","UnityServicesInitializer","CreateStaticInstance"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"]],[["Unity","Services","Core","Environments","Client","Http","JsonHelpers","RegisterTypesForAOT"]],[["Unity","Services","Core","UnityThreadUtils","CaptureUnityThreadInfo"],["UnityEngine","InputSystem","Plugins","InputForUI","InputSystemProvider","Bootstrap"],["UnityEngine","InputSystem","InputSystem","RunInitializeInPlayer"],["Spine","Unity","AttachmentTools","AtlasUtilities","Init"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

