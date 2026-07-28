var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i1950 = root || request.c( 'UnityEngine.JointSpring' )
  var i1951 = data
  i1950.spring = i1951[0]
  i1950.damper = i1951[1]
  i1950.targetPosition = i1951[2]
  return i1950
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i1952 = root || request.c( 'UnityEngine.JointMotor' )
  var i1953 = data
  i1952.m_TargetVelocity = i1953[0]
  i1952.m_Force = i1953[1]
  i1952.m_FreeSpin = i1953[2]
  return i1952
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i1954 = root || request.c( 'UnityEngine.JointLimits' )
  var i1955 = data
  i1954.m_Min = i1955[0]
  i1954.m_Max = i1955[1]
  i1954.m_Bounciness = i1955[2]
  i1954.m_BounceMinVelocity = i1955[3]
  i1954.m_ContactDistance = i1955[4]
  i1954.minBounce = i1955[5]
  i1954.maxBounce = i1955[6]
  return i1954
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i1956 = root || request.c( 'UnityEngine.JointDrive' )
  var i1957 = data
  i1956.m_PositionSpring = i1957[0]
  i1956.m_PositionDamper = i1957[1]
  i1956.m_MaximumForce = i1957[2]
  i1956.m_UseAcceleration = i1957[3]
  return i1956
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i1958 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i1959 = data
  i1958.m_Spring = i1959[0]
  i1958.m_Damper = i1959[1]
  return i1958
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i1960 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i1961 = data
  i1960.m_Limit = i1961[0]
  i1960.m_Bounciness = i1961[1]
  i1960.m_ContactDistance = i1961[2]
  return i1960
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i1962 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i1963 = data
  i1962.m_ExtremumSlip = i1963[0]
  i1962.m_ExtremumValue = i1963[1]
  i1962.m_AsymptoteSlip = i1963[2]
  i1962.m_AsymptoteValue = i1963[3]
  i1962.m_Stiffness = i1963[4]
  return i1962
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i1964 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i1965 = data
  i1964.m_LowerAngle = i1965[0]
  i1964.m_UpperAngle = i1965[1]
  return i1964
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i1966 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i1967 = data
  i1966.m_MotorSpeed = i1967[0]
  i1966.m_MaximumMotorTorque = i1967[1]
  return i1966
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i1968 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i1969 = data
  i1968.m_DampingRatio = i1969[0]
  i1968.m_Frequency = i1969[1]
  i1968.m_Angle = i1969[2]
  return i1968
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i1970 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i1971 = data
  i1970.m_LowerTranslation = i1971[0]
  i1970.m_UpperTranslation = i1971[1]
  return i1970
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i1972 = root || new pc.UnityMaterial()
  var i1973 = data
  i1972.name = i1973[0]
  request.r(i1973[1], i1973[2], 0, i1972, 'shader')
  i1972.renderQueue = i1973[3]
  i1972.enableInstancing = !!i1973[4]
  var i1975 = i1973[5]
  var i1974 = []
  for(var i = 0; i < i1975.length; i += 1) {
    i1974.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i1975[i + 0]) );
  }
  i1972.floatParameters = i1974
  var i1977 = i1973[6]
  var i1976 = []
  for(var i = 0; i < i1977.length; i += 1) {
    i1976.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i1977[i + 0]) );
  }
  i1972.colorParameters = i1976
  var i1979 = i1973[7]
  var i1978 = []
  for(var i = 0; i < i1979.length; i += 1) {
    i1978.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i1979[i + 0]) );
  }
  i1972.vectorParameters = i1978
  var i1981 = i1973[8]
  var i1980 = []
  for(var i = 0; i < i1981.length; i += 1) {
    i1980.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i1981[i + 0]) );
  }
  i1972.textureParameters = i1980
  var i1983 = i1973[9]
  var i1982 = []
  for(var i = 0; i < i1983.length; i += 1) {
    i1982.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i1983[i + 0]) );
  }
  i1972.materialFlags = i1982
  return i1972
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i1986 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i1987 = data
  i1986.name = i1987[0]
  i1986.value = i1987[1]
  return i1986
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i1990 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i1991 = data
  i1990.name = i1991[0]
  i1990.value = new pc.Color(i1991[1], i1991[2], i1991[3], i1991[4])
  return i1990
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i1994 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i1995 = data
  i1994.name = i1995[0]
  i1994.value = new pc.Vec4( i1995[1], i1995[2], i1995[3], i1995[4] )
  return i1994
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i1998 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i1999 = data
  i1998.name = i1999[0]
  request.r(i1999[1], i1999[2], 0, i1998, 'value')
  return i1998
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i2002 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i2003 = data
  i2002.name = i2003[0]
  i2002.enabled = !!i2003[1]
  return i2002
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i2004 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i2005 = data
  i2004.name = i2005[0]
  i2004.width = i2005[1]
  i2004.height = i2005[2]
  i2004.mipmapCount = i2005[3]
  i2004.anisoLevel = i2005[4]
  i2004.filterMode = i2005[5]
  i2004.hdr = !!i2005[6]
  i2004.format = i2005[7]
  i2004.wrapMode = i2005[8]
  i2004.alphaIsTransparency = !!i2005[9]
  i2004.alphaSource = i2005[10]
  i2004.graphicsFormat = i2005[11]
  i2004.sRGBTexture = !!i2005[12]
  i2004.desiredColorSpace = i2005[13]
  i2004.wrapU = i2005[14]
  i2004.wrapV = i2005[15]
  return i2004
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i2006 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i2007 = data
  i2006.name = i2007[0]
  i2006.halfPrecision = !!i2007[1]
  i2006.useSimplification = !!i2007[2]
  i2006.useUInt32IndexFormat = !!i2007[3]
  i2006.vertexCount = i2007[4]
  i2006.aabb = i2007[5]
  var i2009 = i2007[6]
  var i2008 = []
  for(var i = 0; i < i2009.length; i += 1) {
    i2008.push( !!i2009[i + 0] );
  }
  i2006.streams = i2008
  i2006.vertices = i2007[7]
  var i2011 = i2007[8]
  var i2010 = []
  for(var i = 0; i < i2011.length; i += 1) {
    i2010.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i2011[i + 0]) );
  }
  i2006.subMeshes = i2010
  var i2013 = i2007[9]
  var i2012 = []
  for(var i = 0; i < i2013.length; i += 16) {
    i2012.push( new pc.Mat4().setData(i2013[i + 0], i2013[i + 1], i2013[i + 2], i2013[i + 3],  i2013[i + 4], i2013[i + 5], i2013[i + 6], i2013[i + 7],  i2013[i + 8], i2013[i + 9], i2013[i + 10], i2013[i + 11],  i2013[i + 12], i2013[i + 13], i2013[i + 14], i2013[i + 15]) );
  }
  i2006.bindposes = i2012
  var i2015 = i2007[10]
  var i2014 = []
  for(var i = 0; i < i2015.length; i += 1) {
    i2014.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i2015[i + 0]) );
  }
  i2006.blendShapes = i2014
  return i2006
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i2020 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i2021 = data
  i2020.triangles = i2021[0]
  return i2020
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i2026 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i2027 = data
  i2026.name = i2027[0]
  var i2029 = i2027[1]
  var i2028 = []
  for(var i = 0; i < i2029.length; i += 1) {
    i2028.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i2029[i + 0]) );
  }
  i2026.frames = i2028
  return i2026
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Transform"] = function (request, data, root) {
  var i2030 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Transform' )
  var i2031 = data
  i2030.position = new pc.Vec3( i2031[0], i2031[1], i2031[2] )
  i2030.scale = new pc.Vec3( i2031[3], i2031[4], i2031[5] )
  i2030.rotation = new pc.Quat(i2031[6], i2031[7], i2031[8], i2031[9])
  return i2030
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Animator"] = function (request, data, root) {
  var i2032 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Animator' )
  var i2033 = data
  request.r(i2033[0], i2033[1], 0, i2032, 'animatorController')
  request.r(i2033[2], i2033[3], 0, i2032, 'avatar')
  i2032.updateMode = i2033[4]
  i2032.hasTransformHierarchy = !!i2033[5]
  i2032.applyRootMotion = !!i2033[6]
  var i2035 = i2033[7]
  var i2034 = []
  for(var i = 0; i < i2035.length; i += 2) {
  request.r(i2035[i + 0], i2035[i + 1], 2, i2034, '')
  }
  i2032.humanBones = i2034
  i2032.enabled = !!i2033[8]
  return i2032
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer"] = function (request, data, root) {
  var i2038 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer' )
  var i2039 = data
  i2038.color = new pc.Color(i2039[0], i2039[1], i2039[2], i2039[3])
  request.r(i2039[4], i2039[5], 0, i2038, 'sprite')
  i2038.flipX = !!i2039[6]
  i2038.flipY = !!i2039[7]
  i2038.drawMode = i2039[8]
  i2038.size = new pc.Vec2( i2039[9], i2039[10] )
  i2038.tileMode = i2039[11]
  i2038.adaptiveModeThreshold = i2039[12]
  i2038.maskInteraction = i2039[13]
  i2038.spriteSortPoint = i2039[14]
  i2038.enabled = !!i2039[15]
  request.r(i2039[16], i2039[17], 0, i2038, 'sharedMaterial')
  var i2041 = i2039[18]
  var i2040 = []
  for(var i = 0; i < i2041.length; i += 2) {
  request.r(i2041[i + 0], i2041[i + 1], 2, i2040, '')
  }
  i2038.sharedMaterials = i2040
  i2038.receiveShadows = !!i2039[19]
  i2038.shadowCastingMode = i2039[20]
  i2038.sortingLayerID = i2039[21]
  i2038.sortingOrder = i2039[22]
  i2038.lightmapIndex = i2039[23]
  i2038.lightmapSceneIndex = i2039[24]
  i2038.lightmapScaleOffset = new pc.Vec4( i2039[25], i2039[26], i2039[27], i2039[28] )
  i2038.lightProbeUsage = i2039[29]
  i2038.reflectionProbeUsage = i2039[30]
  return i2038
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i2044 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i2045 = data
  i2044.name = i2045[0]
  i2044.tagId = i2045[1]
  i2044.enabled = !!i2045[2]
  i2044.isStatic = !!i2045[3]
  i2044.layer = i2045[4]
  return i2044
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i2046 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i2047 = data
  i2046.name = i2047[0]
  i2046.index = i2047[1]
  i2046.startup = !!i2047[2]
  return i2046
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i2048 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i2049 = data
  i2048.aspect = i2049[0]
  i2048.orthographic = !!i2049[1]
  i2048.orthographicSize = i2049[2]
  i2048.backgroundColor = new pc.Color(i2049[3], i2049[4], i2049[5], i2049[6])
  i2048.nearClipPlane = i2049[7]
  i2048.farClipPlane = i2049[8]
  i2048.fieldOfView = i2049[9]
  i2048.depth = i2049[10]
  i2048.clearFlags = i2049[11]
  i2048.cullingMask = i2049[12]
  i2048.rect = i2049[13]
  request.r(i2049[14], i2049[15], 0, i2048, 'targetTexture')
  i2048.usePhysicalProperties = !!i2049[16]
  i2048.focalLength = i2049[17]
  i2048.sensorSize = new pc.Vec2( i2049[18], i2049[19] )
  i2048.lensShift = new pc.Vec2( i2049[20], i2049[21] )
  i2048.gateFit = i2049[22]
  i2048.commandBufferCount = i2049[23]
  i2048.cameraType = i2049[24]
  i2048.enabled = !!i2049[25]
  return i2048
}

Deserializers["AutoCameraFit"] = function (request, data, root) {
  var i2050 = root || request.c( 'AutoCameraFit' )
  var i2051 = data
  request.r(i2051[0], i2051[1], 0, i2050, 'tallScreenObject')
  i2050.tallScreenRatioThreshold = i2051[2]
  i2050.tallScreenYOffset = i2051[3]
  request.r(i2051[4], i2051[5], 0, i2050, 'canvasBtn')
  request.r(i2051[6], i2051[7], 0, i2050, 'targetArea')
  i2050.paddingLandscape = i2051[8]
  i2050.paddingPortrait = i2051[9]
  i2050.extraPaddingSmallScreen = i2051[10]
  i2050.smallScreenThreshold = i2051[11]
  i2050.autoUpdateOnResize = !!i2051[12]
  i2050.adjustInEditMode = !!i2051[13]
  return i2050
}

Deserializers["CharacterManager"] = function (request, data, root) {
  var i2052 = root || request.c( 'CharacterManager' )
  var i2053 = data
  var i2055 = i2053[0]
  var i2054 = new (System.Collections.Generic.List$1(Bridge.ns('CharacterEquipmentSetup')))
  for(var i = 0; i < i2055.length; i += 1) {
    i2054.add(request.d('CharacterEquipmentSetup', i2055[i + 0]));
  }
  i2052.characterSetups = i2054
  request.r(i2053[1], i2053[2], 0, i2052, 'character1')
  request.r(i2053[3], i2053[4], 0, i2052, 'targetTestCharacter')
  request.r(i2053[5], i2053[6], 0, i2052, 'testEquipmentDataAsset')
  var i2057 = i2053[7]
  var i2056 = new (System.Collections.Generic.List$1(Bridge.ns('SkinToggleEntry')))
  for(var i = 0; i < i2057.length; i += 1) {
    i2056.add(request.d('SkinToggleEntry', i2057[i + 0]));
  }
  i2052.mySkinSet = i2056
  return i2052
}

Deserializers["CharacterEquipmentSetup"] = function (request, data, root) {
  var i2060 = root || request.c( 'CharacterEquipmentSetup' )
  var i2061 = data
  request.r(i2061[0], i2061[1], 0, i2060, 'character')
  request.r(i2061[2], i2061[3], 0, i2060, 'equipmentData')
  return i2060
}

Deserializers["SkinToggleEntry"] = function (request, data, root) {
  var i2064 = root || request.c( 'SkinToggleEntry' )
  var i2065 = data
  i2064.isEnabled = !!i2065[0]
  i2064.skinName = i2065[1]
  request.r(i2065[2], i2065[3], 0, i2064, 'skeletonDataAsset')
  return i2064
}

Deserializers["GameManager"] = function (request, data, root) {
  var i2066 = root || request.c( 'GameManager' )
  var i2067 = data
  i2066.isGoogleBuild = !!i2067[0]
  var i2069 = i2067[1]
  var i2068 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.GameObject')))
  for(var i = 0; i < i2069.length; i += 2) {
  request.r(i2069[i + 0], i2069[i + 1], 1, i2068, '')
  }
  i2066.googleDisabledObjects = i2068
  var i2071 = i2067[2]
  var i2070 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Behaviour')))
  for(var i = 0; i < i2071.length; i += 2) {
  request.r(i2071[i + 0], i2071[i + 1], 1, i2070, '')
  }
  i2066.googleDisabledBehaviours = i2070
  return i2066
}

Deserializers["SlotManager"] = function (request, data, root) {
  var i2076 = root || request.c( 'SlotManager' )
  var i2077 = data
  var i2079 = i2077[0]
  var i2078 = new (System.Collections.Generic.List$1(Bridge.ns('SlotSetup')))
  for(var i = 0; i < i2079.length; i += 2) {
  request.r(i2079[i + 0], i2079[i + 1], 1, i2078, '')
  }
  i2076.allSlots = i2078
  i2076.maxSlotsToPlay = i2077[1]
  request.r(i2077[2], i2077[3], 0, i2076, 'objectToHideOnFirstClick')
  request.r(i2077[4], i2077[5], 0, i2076, 'rightEffectPrefab')
  request.r(i2077[6], i2077[7], 0, i2076, 'rightEffectSpawnPoint')
  var i2081 = i2077[8]
  var i2080 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Sprite')))
  for(var i = 0; i < i2081.length; i += 2) {
  request.r(i2081[i + 0], i2081[i + 1], 1, i2080, '')
  }
  i2076.rightEffectSprites = i2080
  return i2076
}

Deserializers["Ply_Pool"] = function (request, data, root) {
  var i2086 = root || request.c( 'Ply_Pool' )
  var i2087 = data
  var i2089 = i2087[0]
  var i2088 = []
  for(var i = 0; i < i2089.length; i += 1) {
    i2088.push( request.d('Ply_Pool+PoolAmount', i2089[i + 0]) );
  }
  i2086.poolAmounts = i2088
  return i2086
}

Deserializers["Ply_Pool+PoolAmount"] = function (request, data, root) {
  var i2092 = root || request.c( 'Ply_Pool+PoolAmount' )
  var i2093 = data
  i2092.type = i2093[0]
  i2092.amount = i2093[1]
  request.r(i2093[2], i2093[3], 0, i2092, 'gameUnit')
  return i2092
}

Deserializers["Ply_SoundManager"] = function (request, data, root) {
  var i2094 = root || request.c( 'Ply_SoundManager' )
  var i2095 = data
  i2094.fxAudio = request.d('FxAudio', i2095[0], i2094.fxAudio)
  request.r(i2095[1], i2095[2], 0, i2094, 'bgm')
  return i2094
}

Deserializers["FxAudio"] = function (request, data, root) {
  var i2096 = root || request.c( 'FxAudio' )
  var i2097 = data
  i2096.Left = request.d('SoundData', i2097[0], i2096.Left)
  i2096.Right = request.d('SoundData', i2097[1], i2096.Right)
  i2096.Yeah = request.d('SoundData', i2097[2], i2096.Yeah)
  i2096.Click = request.d('SoundData', i2097[3], i2096.Click)
  return i2096
}

Deserializers["SoundData"] = function (request, data, root) {
  var i2098 = root || request.c( 'SoundData' )
  var i2099 = data
  request.r(i2099[0], i2099[1], 0, i2098, 'clip')
  i2098.repeatCount = i2099[2]
  return i2098
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i2100 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i2101 = data
  request.r(i2101[0], i2101[1], 0, i2100, 'clip')
  request.r(i2101[2], i2101[3], 0, i2100, 'outputAudioMixerGroup')
  i2100.playOnAwake = !!i2101[4]
  i2100.loop = !!i2101[5]
  i2100.time = i2101[6]
  i2100.volume = i2101[7]
  i2100.pitch = i2101[8]
  i2100.enabled = !!i2101[9]
  return i2100
}

Deserializers["ProgressTrackingManager"] = function (request, data, root) {
  var i2102 = root || request.c( 'ProgressTrackingManager' )
  var i2103 = data
  i2102.maxScore = i2103[0]
  i2102.currentScore = i2103[1]
  i2102.currentPercent = i2103[2]
  return i2102
}

Deserializers["ScreenHeightPositionAnchor"] = function (request, data, root) {
  var i2104 = root || request.c( 'ScreenHeightPositionAnchor' )
  var i2105 = data
  request.r(i2105[0], i2105[1], 0, i2104, 'anchorPoint')
  request.r(i2105[2], i2105[3], 0, i2104, 'targetCamera')
  i2104.viewportYRatio = i2105[4]
  i2104.alignOnStart = !!i2105[5]
  i2104.alignOnEnable = !!i2105[6]
  i2104.alwaysUpdate = !!i2105[7]
  i2104.realignOnScreenSizeChanged = !!i2105[8]
  i2104.drawGizmos = !!i2105[9]
  i2104.targetLineColor = new pc.Color(i2105[10], i2105[11], i2105[12], i2105[13])
  i2104.anchorColor = new pc.Color(i2105[14], i2105[15], i2105[16], i2105[17])
  return i2104
}

Deserializers["SlotSetup"] = function (request, data, root) {
  var i2106 = root || request.c( 'SlotSetup' )
  var i2107 = data
  request.r(i2107[0], i2107[1], 0, i2106, 'slotData')
  request.r(i2107[2], i2107[3], 0, i2106, 'borderGold')
  request.r(i2107[4], i2107[5], 0, i2106, 'borderWhite')
  request.r(i2107[6], i2107[7], 0, i2106, 'greyCard')
  request.r(i2107[8], i2107[9], 0, i2106, 'blueCard')
  request.r(i2107[10], i2107[11], 0, i2106, 'greenCard')
  request.r(i2107[12], i2107[13], 0, i2106, 'greenTick')
  request.r(i2107[14], i2107[15], 0, i2106, 'leftBalloonObj')
  request.r(i2107[16], i2107[17], 0, i2106, 'rightBalloonObj')
  request.r(i2107[18], i2107[19], 0, i2106, 'leftBalloonItemRenderer')
  request.r(i2107[20], i2107[21], 0, i2106, 'rightBalloonItemRenderer')
  return i2106
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i2108 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i2109 = data
  i2108.pivot = new pc.Vec2( i2109[0], i2109[1] )
  i2108.anchorMin = new pc.Vec2( i2109[2], i2109[3] )
  i2108.anchorMax = new pc.Vec2( i2109[4], i2109[5] )
  i2108.sizeDelta = new pc.Vec2( i2109[6], i2109[7] )
  i2108.anchoredPosition3D = new pc.Vec3( i2109[8], i2109[9], i2109[10] )
  i2108.rotation = new pc.Quat(i2109[11], i2109[12], i2109[13], i2109[14])
  i2108.scale = new pc.Vec3( i2109[15], i2109[16], i2109[17] )
  return i2108
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i2110 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i2111 = data
  request.r(i2111[0], i2111[1], 0, i2110, 'additionalVertexStreams')
  i2110.enabled = !!i2111[2]
  request.r(i2111[3], i2111[4], 0, i2110, 'sharedMaterial')
  var i2113 = i2111[5]
  var i2112 = []
  for(var i = 0; i < i2113.length; i += 2) {
  request.r(i2113[i + 0], i2113[i + 1], 2, i2112, '')
  }
  i2110.sharedMaterials = i2112
  i2110.receiveShadows = !!i2111[6]
  i2110.shadowCastingMode = i2111[7]
  i2110.sortingLayerID = i2111[8]
  i2110.sortingOrder = i2111[9]
  i2110.lightmapIndex = i2111[10]
  i2110.lightmapSceneIndex = i2111[11]
  i2110.lightmapScaleOffset = new pc.Vec4( i2111[12], i2111[13], i2111[14], i2111[15] )
  i2110.lightProbeUsage = i2111[16]
  i2110.reflectionProbeUsage = i2111[17]
  return i2110
}

Deserializers["TMPro.TextMeshPro"] = function (request, data, root) {
  var i2114 = root || request.c( 'TMPro.TextMeshPro' )
  var i2115 = data
  i2114._SortingLayer = i2115[0]
  i2114._SortingLayerID = i2115[1]
  i2114._SortingOrder = i2115[2]
  i2114.m_hasFontAssetChanged = !!i2115[3]
  request.r(i2115[4], i2115[5], 0, i2114, 'm_renderer')
  i2114.m_maskType = i2115[6]
  i2114.m_text = i2115[7]
  i2114.m_isRightToLeft = !!i2115[8]
  request.r(i2115[9], i2115[10], 0, i2114, 'm_fontAsset')
  request.r(i2115[11], i2115[12], 0, i2114, 'm_sharedMaterial')
  var i2117 = i2115[13]
  var i2116 = []
  for(var i = 0; i < i2117.length; i += 2) {
  request.r(i2117[i + 0], i2117[i + 1], 2, i2116, '')
  }
  i2114.m_fontSharedMaterials = i2116
  request.r(i2115[14], i2115[15], 0, i2114, 'm_fontMaterial')
  var i2119 = i2115[16]
  var i2118 = []
  for(var i = 0; i < i2119.length; i += 2) {
  request.r(i2119[i + 0], i2119[i + 1], 2, i2118, '')
  }
  i2114.m_fontMaterials = i2118
  i2114.m_fontColor32 = UnityEngine.Color32.ConstructColor(i2115[17], i2115[18], i2115[19], i2115[20])
  i2114.m_fontColor = new pc.Color(i2115[21], i2115[22], i2115[23], i2115[24])
  i2114.m_enableVertexGradient = !!i2115[25]
  i2114.m_colorMode = i2115[26]
  i2114.m_fontColorGradient = request.d('TMPro.VertexGradient', i2115[27], i2114.m_fontColorGradient)
  request.r(i2115[28], i2115[29], 0, i2114, 'm_fontColorGradientPreset')
  request.r(i2115[30], i2115[31], 0, i2114, 'm_spriteAsset')
  i2114.m_tintAllSprites = !!i2115[32]
  request.r(i2115[33], i2115[34], 0, i2114, 'm_StyleSheet')
  i2114.m_TextStyleHashCode = i2115[35]
  i2114.m_overrideHtmlColors = !!i2115[36]
  i2114.m_faceColor = UnityEngine.Color32.ConstructColor(i2115[37], i2115[38], i2115[39], i2115[40])
  i2114.m_fontSize = i2115[41]
  i2114.m_fontSizeBase = i2115[42]
  i2114.m_fontWeight = i2115[43]
  i2114.m_enableAutoSizing = !!i2115[44]
  i2114.m_fontSizeMin = i2115[45]
  i2114.m_fontSizeMax = i2115[46]
  i2114.m_fontStyle = i2115[47]
  i2114.m_HorizontalAlignment = i2115[48]
  i2114.m_VerticalAlignment = i2115[49]
  i2114.m_textAlignment = i2115[50]
  i2114.m_characterSpacing = i2115[51]
  i2114.m_wordSpacing = i2115[52]
  i2114.m_lineSpacing = i2115[53]
  i2114.m_lineSpacingMax = i2115[54]
  i2114.m_paragraphSpacing = i2115[55]
  i2114.m_charWidthMaxAdj = i2115[56]
  i2114.m_TextWrappingMode = i2115[57]
  i2114.m_wordWrappingRatios = i2115[58]
  i2114.m_overflowMode = i2115[59]
  request.r(i2115[60], i2115[61], 0, i2114, 'm_linkedTextComponent')
  request.r(i2115[62], i2115[63], 0, i2114, 'parentLinkedComponent')
  i2114.m_enableKerning = !!i2115[64]
  var i2121 = i2115[65]
  var i2120 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i2121.length; i += 1) {
    i2120.add(i2121[i + 0]);
  }
  i2114.m_ActiveFontFeatures = i2120
  i2114.m_enableExtraPadding = !!i2115[66]
  i2114.checkPaddingRequired = !!i2115[67]
  i2114.m_isRichText = !!i2115[68]
  i2114.m_parseCtrlCharacters = !!i2115[69]
  i2114.m_isOrthographic = !!i2115[70]
  i2114.m_isCullingEnabled = !!i2115[71]
  i2114.m_horizontalMapping = i2115[72]
  i2114.m_verticalMapping = i2115[73]
  i2114.m_uvLineOffset = i2115[74]
  i2114.m_geometrySortingOrder = i2115[75]
  i2114.m_IsTextObjectScaleStatic = !!i2115[76]
  i2114.m_VertexBufferAutoSizeReduction = !!i2115[77]
  i2114.m_useMaxVisibleDescender = !!i2115[78]
  i2114.m_pageToDisplay = i2115[79]
  i2114.m_margin = new pc.Vec4( i2115[80], i2115[81], i2115[82], i2115[83] )
  i2114.m_isUsingLegacyAnimationComponent = !!i2115[84]
  i2114.m_isVolumetricText = !!i2115[85]
  request.r(i2115[86], i2115[87], 0, i2114, 'm_Material')
  i2114.m_EmojiFallbackSupport = !!i2115[88]
  i2114.m_Maskable = !!i2115[89]
  i2114.m_Color = new pc.Color(i2115[90], i2115[91], i2115[92], i2115[93])
  i2114.m_RaycastTarget = !!i2115[94]
  i2114.m_RaycastPadding = new pc.Vec4( i2115[95], i2115[96], i2115[97], i2115[98] )
  return i2114
}

Deserializers["TMPro.VertexGradient"] = function (request, data, root) {
  var i2122 = root || request.c( 'TMPro.VertexGradient' )
  var i2123 = data
  i2122.topLeft = new pc.Color(i2123[0], i2123[1], i2123[2], i2123[3])
  i2122.topRight = new pc.Color(i2123[4], i2123[5], i2123[6], i2123[7])
  i2122.bottomLeft = new pc.Color(i2123[8], i2123[9], i2123[10], i2123[11])
  i2122.bottomRight = new pc.Color(i2123[12], i2123[13], i2123[14], i2123[15])
  return i2122
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider"] = function (request, data, root) {
  var i2126 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider' )
  var i2127 = data
  i2126.center = new pc.Vec3( i2127[0], i2127[1], i2127[2] )
  i2126.radius = i2127[3]
  i2126.height = i2127[4]
  i2126.direction = i2127[5]
  i2126.enabled = !!i2127[6]
  i2126.isTrigger = !!i2127[7]
  request.r(i2127[8], i2127[9], 0, i2126, 'material')
  return i2126
}

Deserializers["BalloonController"] = function (request, data, root) {
  var i2128 = root || request.c( 'BalloonController' )
  var i2129 = data
  request.r(i2129[0], i2129[1], 0, i2128, 'targetItem')
  i2128.interactableLayer = UnityEngine.LayerMask.FromIntegerValue( i2129[2] )
  i2128.flyDuration = i2129[3]
  i2128.scaleDuration = i2129[4]
  i2128.delayBeforeNextSlot = i2129[5]
  i2128.onBalloonClicked = request.d('UnityEngine.Events.UnityEvent', i2129[6], i2128.onBalloonClicked)
  return i2128
}

Deserializers["UnityEngine.Events.UnityEvent"] = function (request, data, root) {
  var i2130 = root || request.c( 'UnityEngine.Events.UnityEvent' )
  var i2131 = data
  i2130.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i2131[0], i2130.m_PersistentCalls)
  return i2130
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i2132 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i2133 = data
  var i2135 = i2133[0]
  var i2134 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i2135.length; i += 1) {
    i2134.add(request.d('UnityEngine.Events.PersistentCall', i2135[i + 0]));
  }
  i2132.m_Calls = i2134
  return i2132
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i2138 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i2139 = data
  request.r(i2139[0], i2139[1], 0, i2138, 'm_Target')
  i2138.m_TargetAssemblyTypeName = i2139[2]
  i2138.m_MethodName = i2139[3]
  i2138.m_Mode = i2139[4]
  i2138.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i2139[5], i2138.m_Arguments)
  i2138.m_CallState = i2139[6]
  return i2138
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i2140 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i2141 = data
  request.r(i2141[0], i2141[1], 0, i2140, 'm_ObjectArgument')
  i2140.m_ObjectArgumentAssemblyTypeName = i2141[2]
  i2140.m_IntArgument = i2141[3]
  i2140.m_FloatArgument = i2141[4]
  i2140.m_StringArgument = i2141[5]
  i2140.m_BoolArgument = !!i2141[6]
  return i2140
}

Deserializers["BalloonActionTrigger"] = function (request, data, root) {
  var i2142 = root || request.c( 'BalloonActionTrigger' )
  var i2143 = data
  request.r(i2143[0], i2143[1], 0, i2142, 'targetCharacter')
  i2142.animationTrack = i2143[2]
  i2142.animationName = i2143[3]
  i2142.clearOtherAnimations = !!i2143[4]
  request.r(i2143[5], i2143[6], 0, i2142, 'skeletonDataAsset')
  return i2142
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i2144 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i2145 = data
  request.r(i2145[0], i2145[1], 0, i2144, 'sharedMesh')
  return i2144
}

Deserializers["Spine.Unity.SkeletonAnimation"] = function (request, data, root) {
  var i2146 = root || request.c( 'Spine.Unity.SkeletonAnimation' )
  var i2147 = data
  i2146.loop = !!i2147[0]
  i2146.timeScale = i2147[1]
  request.r(i2147[2], i2147[3], 0, i2146, 'skeletonDataAsset')
  i2146.initialSkinName = i2147[4]
  i2146.fixPrefabOverrideViaMeshFilter = i2147[5]
  i2146.initialFlipX = !!i2147[6]
  i2146.initialFlipY = !!i2147[7]
  i2146.updateWhenInvisible = i2147[8]
  i2146.zSpacing = i2147[9]
  i2146.useClipping = !!i2147[10]
  i2146.immutableTriangles = !!i2147[11]
  i2146.pmaVertexColors = !!i2147[12]
  i2146.clearStateOnDisable = !!i2147[13]
  i2146.tintBlack = !!i2147[14]
  i2146.singleSubmesh = !!i2147[15]
  i2146.fixDrawOrder = !!i2147[16]
  i2146.addNormals = !!i2147[17]
  i2146.calculateTangents = !!i2147[18]
  i2146.maskInteraction = i2147[19]
  i2146.maskMaterials = request.d('Spine.Unity.SkeletonRenderer+SpriteMaskInteractionMaterials', i2147[20], i2146.maskMaterials)
  i2146.disableRenderingOnOverride = !!i2147[21]
  i2146.updateTiming = i2147[22]
  i2146.unscaledTime = !!i2147[23]
  i2146._animationName = i2147[24]
  var i2149 = i2147[25]
  var i2148 = []
  for(var i = 0; i < i2149.length; i += 1) {
    i2148.push( i2149[i + 0] );
  }
  i2146.separatorSlotNames = i2148
  i2146.physicsPositionInheritanceFactor = new pc.Vec2( i2147[26], i2147[27] )
  i2146.physicsRotationInheritanceFactor = i2147[28]
  request.r(i2147[29], i2147[30], 0, i2146, 'physicsMovementRelativeTo')
  return i2146
}

Deserializers["Spine.Unity.SkeletonRenderer+SpriteMaskInteractionMaterials"] = function (request, data, root) {
  var i2150 = root || request.c( 'Spine.Unity.SkeletonRenderer+SpriteMaskInteractionMaterials' )
  var i2151 = data
  var i2153 = i2151[0]
  var i2152 = []
  for(var i = 0; i < i2153.length; i += 2) {
  request.r(i2153[i + 0], i2153[i + 1], 2, i2152, '')
  }
  i2150.materialsMaskDisabled = i2152
  var i2155 = i2151[1]
  var i2154 = []
  for(var i = 0; i < i2155.length; i += 2) {
  request.r(i2155[i + 0], i2155[i + 1], 2, i2154, '')
  }
  i2150.materialsInsideMask = i2154
  var i2157 = i2151[2]
  var i2156 = []
  for(var i = 0; i < i2157.length; i += 2) {
  request.r(i2157[i + 0], i2157[i + 1], 2, i2156, '')
  }
  i2150.materialsOutsideMask = i2156
  return i2150
}

Deserializers["Character"] = function (request, data, root) {
  var i2160 = root || request.c( 'Character' )
  var i2161 = data
  var i2163 = i2161[0]
  var i2162 = new (System.Collections.Generic.List$1(Bridge.ns('System.String')))
  for(var i = 0; i < i2163.length; i += 1) {
    i2162.add(i2163[i + 0]);
  }
  i2160.currentAppliedSkinNames = i2162
  request.r(i2161[1], i2161[2], 0, i2160, 'tf')
  request.r(i2161[3], i2161[4], 0, i2160, 'skeletonAnimation')
  var i2165 = i2161[5]
  var i2164 = new (System.Collections.Generic.List$1(Bridge.ns('SlotAttachmentPair')))
  for(var i = 0; i < i2165.length; i += 1) {
    i2164.add(request.d('SlotAttachmentPair', i2165[i + 0]));
  }
  i2160.currentAppliedPairs = i2164
  return i2160
}

Deserializers["SlotAttachmentPair"] = function (request, data, root) {
  var i2170 = root || request.c( 'SlotAttachmentPair' )
  var i2171 = data
  i2170.isEnabled = !!i2171[0]
  i2170.slotName = i2171[1]
  i2170.attachmentName = i2171[2]
  request.r(i2171[3], i2171[4], 0, i2170, 'skeletonDataAsset')
  return i2170
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i2172 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i2173 = data
  request.r(i2173[0], i2173[1], 0, i2172, 'm_FirstSelected')
  i2172.m_sendNavigationEvents = !!i2173[2]
  i2172.m_DragThreshold = i2173[3]
  return i2172
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i2174 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i2175 = data
  i2174.m_HorizontalAxis = i2175[0]
  i2174.m_VerticalAxis = i2175[1]
  i2174.m_SubmitButton = i2175[2]
  i2174.m_CancelButton = i2175[3]
  i2174.m_InputActionsPerSecond = i2175[4]
  i2174.m_RepeatDelay = i2175[5]
  i2174.m_ForceModuleActive = !!i2175[6]
  i2174.m_SendPointerHoverToParent = !!i2175[7]
  return i2174
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i2176 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i2177 = data
  i2176.ambientIntensity = i2177[0]
  i2176.reflectionIntensity = i2177[1]
  i2176.ambientMode = i2177[2]
  i2176.ambientLight = new pc.Color(i2177[3], i2177[4], i2177[5], i2177[6])
  i2176.ambientSkyColor = new pc.Color(i2177[7], i2177[8], i2177[9], i2177[10])
  i2176.ambientGroundColor = new pc.Color(i2177[11], i2177[12], i2177[13], i2177[14])
  i2176.ambientEquatorColor = new pc.Color(i2177[15], i2177[16], i2177[17], i2177[18])
  i2176.fogColor = new pc.Color(i2177[19], i2177[20], i2177[21], i2177[22])
  i2176.fogEndDistance = i2177[23]
  i2176.fogStartDistance = i2177[24]
  i2176.fogDensity = i2177[25]
  i2176.fog = !!i2177[26]
  request.r(i2177[27], i2177[28], 0, i2176, 'skybox')
  i2176.fogMode = i2177[29]
  var i2179 = i2177[30]
  var i2178 = []
  for(var i = 0; i < i2179.length; i += 1) {
    i2178.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i2179[i + 0]) );
  }
  i2176.lightmaps = i2178
  i2176.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i2177[31], i2176.lightProbes)
  i2176.lightmapsMode = i2177[32]
  i2176.mixedBakeMode = i2177[33]
  i2176.environmentLightingMode = i2177[34]
  i2176.ambientProbe = new pc.SphericalHarmonicsL2(i2177[35])
  i2176.referenceAmbientProbe = new pc.SphericalHarmonicsL2(i2177[36])
  i2176.useReferenceAmbientProbe = !!i2177[37]
  request.r(i2177[38], i2177[39], 0, i2176, 'customReflection')
  request.r(i2177[40], i2177[41], 0, i2176, 'defaultReflection')
  i2176.defaultReflectionMode = i2177[42]
  i2176.defaultReflectionResolution = i2177[43]
  i2176.sunLightObjectId = i2177[44]
  i2176.pixelLightCount = i2177[45]
  i2176.defaultReflectionHDR = !!i2177[46]
  i2176.hasLightDataAsset = !!i2177[47]
  i2176.hasManualGenerate = !!i2177[48]
  return i2176
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i2182 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i2183 = data
  request.r(i2183[0], i2183[1], 0, i2182, 'lightmapColor')
  request.r(i2183[2], i2183[3], 0, i2182, 'lightmapDirection')
  request.r(i2183[4], i2183[5], 0, i2182, 'shadowMask')
  return i2182
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i2184 = root || new UnityEngine.LightProbes()
  var i2185 = data
  return i2184
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i2192 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i2193 = data
  var i2195 = i2193[0]
  var i2194 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i2195.length; i += 1) {
    i2194.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i2195[i + 0]));
  }
  i2192.ShaderCompilationErrors = i2194
  i2192.name = i2193[1]
  i2192.guid = i2193[2]
  var i2197 = i2193[3]
  var i2196 = []
  for(var i = 0; i < i2197.length; i += 1) {
    i2196.push( i2197[i + 0] );
  }
  i2192.shaderDefinedKeywords = i2196
  var i2199 = i2193[4]
  var i2198 = []
  for(var i = 0; i < i2199.length; i += 1) {
    i2198.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i2199[i + 0]) );
  }
  i2192.passes = i2198
  var i2201 = i2193[5]
  var i2200 = []
  for(var i = 0; i < i2201.length; i += 1) {
    i2200.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i2201[i + 0]) );
  }
  i2192.usePasses = i2200
  var i2203 = i2193[6]
  var i2202 = []
  for(var i = 0; i < i2203.length; i += 1) {
    i2202.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i2203[i + 0]) );
  }
  i2192.defaultParameterValues = i2202
  request.r(i2193[7], i2193[8], 0, i2192, 'unityFallbackShader')
  i2192.readDepth = !!i2193[9]
  i2192.hasDepthOnlyPass = !!i2193[10]
  i2192.isCreatedByShaderGraph = !!i2193[11]
  i2192.disableBatching = !!i2193[12]
  i2192.compiled = !!i2193[13]
  return i2192
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i2206 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i2207 = data
  i2206.shaderName = i2207[0]
  i2206.errorMessage = i2207[1]
  return i2206
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i2210 = root || new pc.UnityShaderPass()
  var i2211 = data
  i2210.id = i2211[0]
  i2210.subShaderIndex = i2211[1]
  i2210.name = i2211[2]
  i2210.passType = i2211[3]
  i2210.grabPassTextureName = i2211[4]
  i2210.usePass = !!i2211[5]
  i2210.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2211[6], i2210.zTest)
  i2210.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2211[7], i2210.zWrite)
  i2210.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2211[8], i2210.culling)
  i2210.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i2211[9], i2210.blending)
  i2210.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i2211[10], i2210.alphaBlending)
  i2210.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2211[11], i2210.colorWriteMask)
  i2210.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2211[12], i2210.offsetUnits)
  i2210.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2211[13], i2210.offsetFactor)
  i2210.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2211[14], i2210.stencilRef)
  i2210.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2211[15], i2210.stencilReadMask)
  i2210.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2211[16], i2210.stencilWriteMask)
  i2210.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i2211[17], i2210.stencilOp)
  i2210.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i2211[18], i2210.stencilOpFront)
  i2210.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i2211[19], i2210.stencilOpBack)
  var i2213 = i2211[20]
  var i2212 = []
  for(var i = 0; i < i2213.length; i += 1) {
    i2212.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i2213[i + 0]) );
  }
  i2210.tags = i2212
  var i2215 = i2211[21]
  var i2214 = []
  for(var i = 0; i < i2215.length; i += 1) {
    i2214.push( i2215[i + 0] );
  }
  i2210.passDefinedKeywords = i2214
  var i2217 = i2211[22]
  var i2216 = []
  for(var i = 0; i < i2217.length; i += 1) {
    i2216.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i2217[i + 0]) );
  }
  i2210.passDefinedKeywordGroups = i2216
  var i2219 = i2211[23]
  var i2218 = []
  for(var i = 0; i < i2219.length; i += 1) {
    i2218.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i2219[i + 0]) );
  }
  i2210.variants = i2218
  var i2221 = i2211[24]
  var i2220 = []
  for(var i = 0; i < i2221.length; i += 1) {
    i2220.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i2221[i + 0]) );
  }
  i2210.excludedVariants = i2220
  i2210.hasDepthReader = !!i2211[25]
  return i2210
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i2222 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i2223 = data
  i2222.val = i2223[0]
  i2222.name = i2223[1]
  return i2222
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i2224 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i2225 = data
  i2224.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2225[0], i2224.src)
  i2224.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2225[1], i2224.dst)
  i2224.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2225[2], i2224.op)
  return i2224
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i2226 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i2227 = data
  i2226.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2227[0], i2226.pass)
  i2226.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2227[1], i2226.fail)
  i2226.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2227[2], i2226.zFail)
  i2226.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2227[3], i2226.comp)
  return i2226
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i2230 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i2231 = data
  i2230.name = i2231[0]
  i2230.value = i2231[1]
  return i2230
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i2234 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i2235 = data
  var i2237 = i2235[0]
  var i2236 = []
  for(var i = 0; i < i2237.length; i += 1) {
    i2236.push( i2237[i + 0] );
  }
  i2234.keywords = i2236
  i2234.hasDiscard = !!i2235[1]
  return i2234
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i2240 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i2241 = data
  i2240.passId = i2241[0]
  i2240.subShaderIndex = i2241[1]
  var i2243 = i2241[2]
  var i2242 = []
  for(var i = 0; i < i2243.length; i += 1) {
    i2242.push( i2243[i + 0] );
  }
  i2240.keywords = i2242
  i2240.vertexProgram = i2241[3]
  i2240.fragmentProgram = i2241[4]
  i2240.exportedForWebGl2 = !!i2241[5]
  i2240.readDepth = !!i2241[6]
  return i2240
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i2246 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i2247 = data
  request.r(i2247[0], i2247[1], 0, i2246, 'shader')
  i2246.pass = i2247[2]
  return i2246
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i2250 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i2251 = data
  i2250.name = i2251[0]
  i2250.type = i2251[1]
  i2250.value = new pc.Vec4( i2251[2], i2251[3], i2251[4], i2251[5] )
  i2250.textureValue = i2251[6]
  i2250.shaderPropertyFlag = i2251[7]
  return i2250
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i2252 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i2253 = data
  i2252.name = i2253[0]
  request.r(i2253[1], i2253[2], 0, i2252, 'texture')
  i2252.aabb = i2253[3]
  i2252.vertices = i2253[4]
  i2252.triangles = i2253[5]
  i2252.textureRect = UnityEngine.Rect.MinMaxRect(i2253[6], i2253[7], i2253[8], i2253[9])
  i2252.packedRect = UnityEngine.Rect.MinMaxRect(i2253[10], i2253[11], i2253[12], i2253[13])
  i2252.border = new pc.Vec4( i2253[14], i2253[15], i2253[16], i2253[17] )
  i2252.transparency = i2253[18]
  i2252.bounds = i2253[19]
  i2252.pixelsPerUnit = i2253[20]
  i2252.textureWidth = i2253[21]
  i2252.textureHeight = i2253[22]
  i2252.nativeSize = new pc.Vec2( i2253[23], i2253[24] )
  i2252.pivot = new pc.Vec2( i2253[25], i2253[26] )
  i2252.textureRectOffset = new pc.Vec2( i2253[27], i2253[28] )
  return i2252
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i2254 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i2255 = data
  i2254.name = i2255[0]
  return i2254
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip"] = function (request, data, root) {
  var i2256 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip' )
  var i2257 = data
  i2256.name = i2257[0]
  i2256.wrapMode = i2257[1]
  i2256.isLooping = !!i2257[2]
  i2256.length = i2257[3]
  var i2259 = i2257[4]
  var i2258 = []
  for(var i = 0; i < i2259.length; i += 1) {
    i2258.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve', i2259[i + 0]) );
  }
  i2256.curves = i2258
  var i2261 = i2257[5]
  var i2260 = []
  for(var i = 0; i < i2261.length; i += 1) {
    i2260.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent', i2261[i + 0]) );
  }
  i2256.events = i2260
  i2256.halfPrecision = !!i2257[6]
  i2256._frameRate = i2257[7]
  i2256.localBounds = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds', i2257[8], i2256.localBounds)
  i2256.hasMuscleCurves = !!i2257[9]
  var i2263 = i2257[10]
  var i2262 = []
  for(var i = 0; i < i2263.length; i += 1) {
    i2262.push( i2263[i + 0] );
  }
  i2256.clipMuscleConstant = i2262
  i2256.clipBindingConstant = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant', i2257[11], i2256.clipBindingConstant)
  return i2256
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve"] = function (request, data, root) {
  var i2266 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve' )
  var i2267 = data
  i2266.path = i2267[0]
  i2266.hash = i2267[1]
  i2266.componentType = i2267[2]
  i2266.property = i2267[3]
  i2266.keys = i2267[4]
  var i2269 = i2267[5]
  var i2268 = []
  for(var i = 0; i < i2269.length; i += 1) {
    i2268.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey', i2269[i + 0]) );
  }
  i2266.objectReferenceKeys = i2268
  return i2266
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey"] = function (request, data, root) {
  var i2272 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey' )
  var i2273 = data
  i2272.time = i2273[0]
  request.r(i2273[1], i2273[2], 0, i2272, 'value')
  return i2272
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent"] = function (request, data, root) {
  var i2276 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent' )
  var i2277 = data
  i2276.functionName = i2277[0]
  i2276.floatParameter = i2277[1]
  i2276.intParameter = i2277[2]
  i2276.stringParameter = i2277[3]
  request.r(i2277[4], i2277[5], 0, i2276, 'objectReferenceParameter')
  i2276.time = i2277[6]
  return i2276
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds"] = function (request, data, root) {
  var i2278 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds' )
  var i2279 = data
  i2278.center = new pc.Vec3( i2279[0], i2279[1], i2279[2] )
  i2278.extends = new pc.Vec3( i2279[3], i2279[4], i2279[5] )
  return i2278
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant"] = function (request, data, root) {
  var i2282 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant' )
  var i2283 = data
  var i2285 = i2283[0]
  var i2284 = []
  for(var i = 0; i < i2285.length; i += 1) {
    i2284.push( i2285[i + 0] );
  }
  i2282.genericBindings = i2284
  var i2287 = i2283[1]
  var i2286 = []
  for(var i = 0; i < i2287.length; i += 1) {
    i2286.push( i2287[i + 0] );
  }
  i2282.pptrCurveMapping = i2286
  return i2282
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i2288 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i2289 = data
  i2288.name = i2289[0]
  i2288.ascent = i2289[1]
  i2288.originalLineHeight = i2289[2]
  i2288.fontSize = i2289[3]
  var i2291 = i2289[4]
  var i2290 = []
  for(var i = 0; i < i2291.length; i += 1) {
    i2290.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i2291[i + 0]) );
  }
  i2288.characterInfo = i2290
  request.r(i2289[5], i2289[6], 0, i2288, 'texture')
  i2288.originalFontSize = i2289[7]
  return i2288
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i2294 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i2295 = data
  i2294.index = i2295[0]
  i2294.advance = i2295[1]
  i2294.bearing = i2295[2]
  i2294.glyphWidth = i2295[3]
  i2294.glyphHeight = i2295[4]
  i2294.minX = i2295[5]
  i2294.maxX = i2295[6]
  i2294.minY = i2295[7]
  i2294.maxY = i2295[8]
  i2294.uvBottomLeftX = i2295[9]
  i2294.uvBottomLeftY = i2295[10]
  i2294.uvBottomRightX = i2295[11]
  i2294.uvBottomRightY = i2295[12]
  i2294.uvTopLeftX = i2295[13]
  i2294.uvTopLeftY = i2295[14]
  i2294.uvTopRightX = i2295[15]
  i2294.uvTopRightY = i2295[16]
  return i2294
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController"] = function (request, data, root) {
  var i2296 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController' )
  var i2297 = data
  i2296.name = i2297[0]
  var i2299 = i2297[1]
  var i2298 = []
  for(var i = 0; i < i2299.length; i += 1) {
    i2298.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer', i2299[i + 0]) );
  }
  i2296.layers = i2298
  var i2301 = i2297[2]
  var i2300 = []
  for(var i = 0; i < i2301.length; i += 1) {
    i2300.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter', i2301[i + 0]) );
  }
  i2296.parameters = i2300
  i2296.animationClips = i2297[3]
  i2296.avatarUnsupported = i2297[4]
  return i2296
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer"] = function (request, data, root) {
  var i2304 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer' )
  var i2305 = data
  i2304.name = i2305[0]
  i2304.defaultWeight = i2305[1]
  i2304.blendingMode = i2305[2]
  i2304.avatarMask = i2305[3]
  i2304.syncedLayerIndex = i2305[4]
  i2304.syncedLayerAffectsTiming = !!i2305[5]
  i2304.syncedLayers = i2305[6]
  i2304.stateMachine = request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i2305[7], i2304.stateMachine)
  return i2304
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine"] = function (request, data, root) {
  var i2306 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine' )
  var i2307 = data
  i2306.id = i2307[0]
  i2306.name = i2307[1]
  i2306.path = i2307[2]
  var i2309 = i2307[3]
  var i2308 = []
  for(var i = 0; i < i2309.length; i += 1) {
    i2308.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState', i2309[i + 0]) );
  }
  i2306.states = i2308
  var i2311 = i2307[4]
  var i2310 = []
  for(var i = 0; i < i2311.length; i += 1) {
    i2310.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i2311[i + 0]) );
  }
  i2306.machines = i2310
  var i2313 = i2307[5]
  var i2312 = []
  for(var i = 0; i < i2313.length; i += 1) {
    i2312.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i2313[i + 0]) );
  }
  i2306.entryStateTransitions = i2312
  var i2315 = i2307[6]
  var i2314 = []
  for(var i = 0; i < i2315.length; i += 1) {
    i2314.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i2315[i + 0]) );
  }
  i2306.exitStateTransitions = i2314
  var i2317 = i2307[7]
  var i2316 = []
  for(var i = 0; i < i2317.length; i += 1) {
    i2316.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i2317[i + 0]) );
  }
  i2306.anyStateTransitions = i2316
  i2306.defaultStateId = i2307[8]
  return i2306
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState"] = function (request, data, root) {
  var i2320 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState' )
  var i2321 = data
  i2320.id = i2321[0]
  i2320.name = i2321[1]
  i2320.cycleOffset = i2321[2]
  i2320.cycleOffsetParameter = i2321[3]
  i2320.cycleOffsetParameterActive = !!i2321[4]
  i2320.mirror = !!i2321[5]
  i2320.mirrorParameter = i2321[6]
  i2320.mirrorParameterActive = !!i2321[7]
  i2320.motionId = i2321[8]
  i2320.nameHash = i2321[9]
  i2320.fullPathHash = i2321[10]
  i2320.speed = i2321[11]
  i2320.speedParameter = i2321[12]
  i2320.speedParameterActive = !!i2321[13]
  i2320.tag = i2321[14]
  i2320.tagHash = i2321[15]
  i2320.writeDefaultValues = !!i2321[16]
  var i2323 = i2321[17]
  var i2322 = []
  for(var i = 0; i < i2323.length; i += 2) {
  request.r(i2323[i + 0], i2323[i + 1], 2, i2322, '')
  }
  i2320.behaviours = i2322
  var i2325 = i2321[18]
  var i2324 = []
  for(var i = 0; i < i2325.length; i += 1) {
    i2324.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i2325[i + 0]) );
  }
  i2320.transitions = i2324
  return i2320
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition"] = function (request, data, root) {
  var i2330 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition' )
  var i2331 = data
  i2330.fullPath = i2331[0]
  i2330.canTransitionToSelf = !!i2331[1]
  i2330.duration = i2331[2]
  i2330.exitTime = i2331[3]
  i2330.hasExitTime = !!i2331[4]
  i2330.hasFixedDuration = !!i2331[5]
  i2330.interruptionSource = i2331[6]
  i2330.offset = i2331[7]
  i2330.orderedInterruption = !!i2331[8]
  i2330.destinationStateId = i2331[9]
  i2330.isExit = !!i2331[10]
  i2330.mute = !!i2331[11]
  i2330.solo = !!i2331[12]
  var i2333 = i2331[13]
  var i2332 = []
  for(var i = 0; i < i2333.length; i += 1) {
    i2332.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i2333[i + 0]) );
  }
  i2330.conditions = i2332
  return i2330
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition"] = function (request, data, root) {
  var i2338 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition' )
  var i2339 = data
  i2338.destinationStateId = i2339[0]
  i2338.isExit = !!i2339[1]
  i2338.mute = !!i2339[2]
  i2338.solo = !!i2339[3]
  var i2341 = i2339[4]
  var i2340 = []
  for(var i = 0; i < i2341.length; i += 1) {
    i2340.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i2341[i + 0]) );
  }
  i2338.conditions = i2340
  return i2338
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter"] = function (request, data, root) {
  var i2344 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter' )
  var i2345 = data
  i2344.defaultBool = !!i2345[0]
  i2344.defaultFloat = i2345[1]
  i2344.defaultInt = i2345[2]
  i2344.name = i2345[3]
  i2344.nameHash = i2345[4]
  i2344.type = i2345[5]
  return i2344
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i2346 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i2347 = data
  i2346.name = i2347[0]
  i2346.bytes64 = i2347[1]
  i2346.data = i2347[2]
  return i2346
}

Deserializers["SlotDataSO"] = function (request, data, root) {
  var i2348 = root || request.c( 'SlotDataSO' )
  var i2349 = data
  i2348.slotName = i2349[0]
  request.r(i2349[1], i2349[2], 0, i2348, 'leftItemSprite')
  request.r(i2349[3], i2349[4], 0, i2348, 'rightItemSprite')
  return i2348
}

Deserializers["Spine.Unity.SkeletonDataAsset"] = function (request, data, root) {
  var i2350 = root || request.c( 'Spine.Unity.SkeletonDataAsset' )
  var i2351 = data
  var i2353 = i2351[0]
  var i2352 = []
  for(var i = 0; i < i2353.length; i += 2) {
  request.r(i2353[i + 0], i2353[i + 1], 2, i2352, '')
  }
  i2350.atlasAssets = i2352
  i2350.scale = i2351[1]
  request.r(i2351[2], i2351[3], 0, i2350, 'skeletonJSON')
  i2350.isUpgradingBlendModeMaterials = !!i2351[4]
  i2350.blendModeMaterials = request.d('Spine.Unity.BlendModeMaterials', i2351[5], i2350.blendModeMaterials)
  var i2355 = i2351[6]
  var i2354 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.SkeletonDataModifierAsset')))
  for(var i = 0; i < i2355.length; i += 2) {
  request.r(i2355[i + 0], i2355[i + 1], 1, i2354, '')
  }
  i2350.skeletonDataModifiers = i2354
  var i2357 = i2351[7]
  var i2356 = []
  for(var i = 0; i < i2357.length; i += 1) {
    i2356.push( i2357[i + 0] );
  }
  i2350.fromAnimation = i2356
  var i2359 = i2351[8]
  var i2358 = []
  for(var i = 0; i < i2359.length; i += 1) {
    i2358.push( i2359[i + 0] );
  }
  i2350.toAnimation = i2358
  i2350.duration = i2351[9]
  i2350.defaultMix = i2351[10]
  request.r(i2351[11], i2351[12], 0, i2350, 'controller')
  return i2350
}

Deserializers["Spine.Unity.BlendModeMaterials"] = function (request, data, root) {
  var i2362 = root || request.c( 'Spine.Unity.BlendModeMaterials' )
  var i2363 = data
  i2362.applyAdditiveMaterial = !!i2363[0]
  var i2365 = i2363[1]
  var i2364 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.BlendModeMaterials+ReplacementMaterial')))
  for(var i = 0; i < i2365.length; i += 1) {
    i2364.add(request.d('Spine.Unity.BlendModeMaterials+ReplacementMaterial', i2365[i + 0]));
  }
  i2362.additiveMaterials = i2364
  var i2367 = i2363[2]
  var i2366 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.BlendModeMaterials+ReplacementMaterial')))
  for(var i = 0; i < i2367.length; i += 1) {
    i2366.add(request.d('Spine.Unity.BlendModeMaterials+ReplacementMaterial', i2367[i + 0]));
  }
  i2362.multiplyMaterials = i2366
  var i2369 = i2363[3]
  var i2368 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.BlendModeMaterials+ReplacementMaterial')))
  for(var i = 0; i < i2369.length; i += 1) {
    i2368.add(request.d('Spine.Unity.BlendModeMaterials+ReplacementMaterial', i2369[i + 0]));
  }
  i2362.screenMaterials = i2368
  i2362.requiresBlendModeMaterials = !!i2363[4]
  return i2362
}

Deserializers["Spine.Unity.BlendModeMaterials+ReplacementMaterial"] = function (request, data, root) {
  var i2372 = root || request.c( 'Spine.Unity.BlendModeMaterials+ReplacementMaterial' )
  var i2373 = data
  i2372.pageName = i2373[0]
  request.r(i2373[1], i2373[2], 0, i2372, 'material')
  return i2372
}

Deserializers["Spine.Unity.SpineAtlasAsset"] = function (request, data, root) {
  var i2376 = root || request.c( 'Spine.Unity.SpineAtlasAsset' )
  var i2377 = data
  request.r(i2377[0], i2377[1], 0, i2376, 'atlasFile')
  var i2379 = i2377[2]
  var i2378 = []
  for(var i = 0; i < i2379.length; i += 2) {
  request.r(i2379[i + 0], i2379[i + 1], 2, i2378, '')
  }
  i2376.materials = i2378
  i2376.textureLoadingMode = i2377[3]
  request.r(i2377[4], i2377[5], 0, i2376, 'onDemandTextureLoader')
  return i2376
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i2380 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i2381 = data
  i2380.normalStyle = i2381[0]
  i2380.normalSpacingOffset = i2381[1]
  i2380.boldStyle = i2381[2]
  i2380.boldSpacing = i2381[3]
  i2380.italicStyle = i2381[4]
  i2380.tabSize = i2381[5]
  request.r(i2381[6], i2381[7], 0, i2380, 'atlas')
  i2380.m_SourceFontFileGUID = i2381[8]
  i2380.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i2381[9], i2380.m_CreationSettings)
  request.r(i2381[10], i2381[11], 0, i2380, 'm_SourceFontFile')
  i2380.m_SourceFontFilePath = i2381[12]
  i2380.m_AtlasPopulationMode = i2381[13]
  i2380.InternalDynamicOS = !!i2381[14]
  var i2383 = i2381[15]
  var i2382 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i2383.length; i += 1) {
    i2382.add(request.d('UnityEngine.TextCore.Glyph', i2383[i + 0]));
  }
  i2380.m_GlyphTable = i2382
  var i2385 = i2381[16]
  var i2384 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i2385.length; i += 1) {
    i2384.add(request.d('TMPro.TMP_Character', i2385[i + 0]));
  }
  i2380.m_CharacterTable = i2384
  var i2387 = i2381[17]
  var i2386 = []
  for(var i = 0; i < i2387.length; i += 2) {
  request.r(i2387[i + 0], i2387[i + 1], 2, i2386, '')
  }
  i2380.m_AtlasTextures = i2386
  i2380.m_AtlasTextureIndex = i2381[18]
  i2380.m_IsMultiAtlasTexturesEnabled = !!i2381[19]
  i2380.m_GetFontFeatures = !!i2381[20]
  i2380.m_ClearDynamicDataOnBuild = !!i2381[21]
  i2380.m_AtlasWidth = i2381[22]
  i2380.m_AtlasHeight = i2381[23]
  i2380.m_AtlasPadding = i2381[24]
  i2380.m_AtlasRenderMode = i2381[25]
  var i2389 = i2381[26]
  var i2388 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i2389.length; i += 1) {
    i2388.add(request.d('UnityEngine.TextCore.GlyphRect', i2389[i + 0]));
  }
  i2380.m_UsedGlyphRects = i2388
  var i2391 = i2381[27]
  var i2390 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i2391.length; i += 1) {
    i2390.add(request.d('UnityEngine.TextCore.GlyphRect', i2391[i + 0]));
  }
  i2380.m_FreeGlyphRects = i2390
  i2380.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i2381[28], i2380.m_FontFeatureTable)
  i2380.m_ShouldReimportFontFeatures = !!i2381[29]
  var i2393 = i2381[30]
  var i2392 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i2393.length; i += 2) {
  request.r(i2393[i + 0], i2393[i + 1], 1, i2392, '')
  }
  i2380.m_FallbackFontAssetTable = i2392
  var i2395 = i2381[31]
  var i2394 = []
  for(var i = 0; i < i2395.length; i += 1) {
    i2394.push( request.d('TMPro.TMP_FontWeightPair', i2395[i + 0]) );
  }
  i2380.m_FontWeightTable = i2394
  var i2397 = i2381[32]
  var i2396 = []
  for(var i = 0; i < i2397.length; i += 1) {
    i2396.push( request.d('TMPro.TMP_FontWeightPair', i2397[i + 0]) );
  }
  i2380.fontWeights = i2396
  i2380.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i2381[33], i2380.m_fontInfo)
  var i2399 = i2381[34]
  var i2398 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i2399.length; i += 1) {
    i2398.add(request.d('TMPro.TMP_Glyph', i2399[i + 0]));
  }
  i2380.m_glyphInfoList = i2398
  i2380.m_KerningTable = request.d('TMPro.KerningTable', i2381[35], i2380.m_KerningTable)
  var i2401 = i2381[36]
  var i2400 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i2401.length; i += 2) {
  request.r(i2401[i + 0], i2401[i + 1], 1, i2400, '')
  }
  i2380.fallbackFontAssets = i2400
  i2380.m_Version = i2381[37]
  i2380.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i2381[38], i2380.m_FaceInfo)
  request.r(i2381[39], i2381[40], 0, i2380, 'm_Material')
  return i2380
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i2402 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i2403 = data
  i2402.sourceFontFileName = i2403[0]
  i2402.sourceFontFileGUID = i2403[1]
  i2402.faceIndex = i2403[2]
  i2402.pointSizeSamplingMode = i2403[3]
  i2402.pointSize = i2403[4]
  i2402.padding = i2403[5]
  i2402.paddingMode = i2403[6]
  i2402.packingMode = i2403[7]
  i2402.atlasWidth = i2403[8]
  i2402.atlasHeight = i2403[9]
  i2402.characterSetSelectionMode = i2403[10]
  i2402.characterSequence = i2403[11]
  i2402.referencedFontAssetGUID = i2403[12]
  i2402.referencedTextAssetGUID = i2403[13]
  i2402.fontStyle = i2403[14]
  i2402.fontStyleModifier = i2403[15]
  i2402.renderMode = i2403[16]
  i2402.includeFontFeatures = !!i2403[17]
  return i2402
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i2406 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i2407 = data
  i2406.m_Index = i2407[0]
  i2406.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i2407[1], i2406.m_Metrics)
  i2406.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i2407[2], i2406.m_GlyphRect)
  i2406.m_Scale = i2407[3]
  i2406.m_AtlasIndex = i2407[4]
  i2406.m_ClassDefinitionType = i2407[5]
  return i2406
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i2410 = root || request.c( 'TMPro.TMP_Character' )
  var i2411 = data
  i2410.m_ElementType = i2411[0]
  i2410.m_Unicode = i2411[1]
  i2410.m_GlyphIndex = i2411[2]
  i2410.m_Scale = i2411[3]
  return i2410
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i2416 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i2417 = data
  i2416.m_X = i2417[0]
  i2416.m_Y = i2417[1]
  i2416.m_Width = i2417[2]
  i2416.m_Height = i2417[3]
  return i2416
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i2418 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i2419 = data
  var i2421 = i2419[0]
  var i2420 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i2421.length; i += 1) {
    i2420.add(request.d('TMPro.MultipleSubstitutionRecord', i2421[i + 0]));
  }
  i2418.m_MultipleSubstitutionRecords = i2420
  var i2423 = i2419[1]
  var i2422 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i2423.length; i += 1) {
    i2422.add(request.d('TMPro.LigatureSubstitutionRecord', i2423[i + 0]));
  }
  i2418.m_LigatureSubstitutionRecords = i2422
  var i2425 = i2419[2]
  var i2424 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i2425.length; i += 1) {
    i2424.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i2425[i + 0]));
  }
  i2418.m_GlyphPairAdjustmentRecords = i2424
  var i2427 = i2419[3]
  var i2426 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i2427.length; i += 1) {
    i2426.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i2427[i + 0]));
  }
  i2418.m_MarkToBaseAdjustmentRecords = i2426
  var i2429 = i2419[4]
  var i2428 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i2429.length; i += 1) {
    i2428.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i2429[i + 0]));
  }
  i2418.m_MarkToMarkAdjustmentRecords = i2428
  return i2418
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i2432 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i2433 = data
  i2432.m_TargetGlyphID = i2433[0]
  i2432.m_SubstituteGlyphIDs = i2433[1]
  return i2432
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i2436 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i2437 = data
  i2436.m_ComponentGlyphIDs = i2437[0]
  i2436.m_LigatureGlyphID = i2437[1]
  return i2436
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i2440 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i2441 = data
  i2440.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i2441[0], i2440.m_FirstAdjustmentRecord)
  i2440.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i2441[1], i2440.m_SecondAdjustmentRecord)
  i2440.m_FeatureLookupFlags = i2441[2]
  return i2440
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i2442 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i2443 = data
  i2442.m_GlyphIndex = i2443[0]
  i2442.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i2443[1], i2442.m_GlyphValueRecord)
  return i2442
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i2444 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i2445 = data
  i2444.m_XPlacement = i2445[0]
  i2444.m_YPlacement = i2445[1]
  i2444.m_XAdvance = i2445[2]
  i2444.m_YAdvance = i2445[3]
  return i2444
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i2448 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i2449 = data
  i2448.m_BaseGlyphID = i2449[0]
  i2448.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i2449[1], i2448.m_BaseGlyphAnchorPoint)
  i2448.m_MarkGlyphID = i2449[2]
  i2448.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i2449[3], i2448.m_MarkPositionAdjustment)
  return i2448
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i2452 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i2453 = data
  i2452.m_BaseMarkGlyphID = i2453[0]
  i2452.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i2453[1], i2452.m_BaseMarkGlyphAnchorPoint)
  i2452.m_CombiningMarkGlyphID = i2453[2]
  i2452.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i2453[3], i2452.m_CombiningMarkPositionAdjustment)
  return i2452
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i2458 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i2459 = data
  request.r(i2459[0], i2459[1], 0, i2458, 'regularTypeface')
  request.r(i2459[2], i2459[3], 0, i2458, 'italicTypeface')
  return i2458
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i2460 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i2461 = data
  i2460.Name = i2461[0]
  i2460.PointSize = i2461[1]
  i2460.Scale = i2461[2]
  i2460.CharacterCount = i2461[3]
  i2460.LineHeight = i2461[4]
  i2460.Baseline = i2461[5]
  i2460.Ascender = i2461[6]
  i2460.CapHeight = i2461[7]
  i2460.Descender = i2461[8]
  i2460.CenterLine = i2461[9]
  i2460.SuperscriptOffset = i2461[10]
  i2460.SubscriptOffset = i2461[11]
  i2460.SubSize = i2461[12]
  i2460.Underline = i2461[13]
  i2460.UnderlineThickness = i2461[14]
  i2460.strikethrough = i2461[15]
  i2460.strikethroughThickness = i2461[16]
  i2460.TabWidth = i2461[17]
  i2460.Padding = i2461[18]
  i2460.AtlasWidth = i2461[19]
  i2460.AtlasHeight = i2461[20]
  return i2460
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i2464 = root || request.c( 'TMPro.TMP_Glyph' )
  var i2465 = data
  i2464.id = i2465[0]
  i2464.x = i2465[1]
  i2464.y = i2465[2]
  i2464.width = i2465[3]
  i2464.height = i2465[4]
  i2464.xOffset = i2465[5]
  i2464.yOffset = i2465[6]
  i2464.xAdvance = i2465[7]
  i2464.scale = i2465[8]
  return i2464
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i2466 = root || request.c( 'TMPro.KerningTable' )
  var i2467 = data
  var i2469 = i2467[0]
  var i2468 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i2469.length; i += 1) {
    i2468.add(request.d('TMPro.KerningPair', i2469[i + 0]));
  }
  i2466.kerningPairs = i2468
  return i2466
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i2472 = root || request.c( 'TMPro.KerningPair' )
  var i2473 = data
  i2472.xOffset = i2473[0]
  i2472.m_FirstGlyph = i2473[1]
  i2472.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i2473[2], i2472.m_FirstGlyphAdjustments)
  i2472.m_SecondGlyph = i2473[3]
  i2472.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i2473[4], i2472.m_SecondGlyphAdjustments)
  i2472.m_IgnoreSpacingAdjustments = !!i2473[5]
  return i2472
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i2474 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i2475 = data
  i2474.m_FaceIndex = i2475[0]
  i2474.m_FamilyName = i2475[1]
  i2474.m_StyleName = i2475[2]
  i2474.m_PointSize = i2475[3]
  i2474.m_Scale = i2475[4]
  i2474.m_UnitsPerEM = i2475[5]
  i2474.m_LineHeight = i2475[6]
  i2474.m_AscentLine = i2475[7]
  i2474.m_CapLine = i2475[8]
  i2474.m_MeanLine = i2475[9]
  i2474.m_Baseline = i2475[10]
  i2474.m_DescentLine = i2475[11]
  i2474.m_SuperscriptOffset = i2475[12]
  i2474.m_SuperscriptSize = i2475[13]
  i2474.m_SubscriptOffset = i2475[14]
  i2474.m_SubscriptSize = i2475[15]
  i2474.m_UnderlineOffset = i2475[16]
  i2474.m_UnderlineThickness = i2475[17]
  i2474.m_StrikethroughOffset = i2475[18]
  i2474.m_StrikethroughThickness = i2475[19]
  i2474.m_TabWidth = i2475[20]
  return i2474
}

Deserializers["EquipmentSetData"] = function (request, data, root) {
  var i2476 = root || request.c( 'EquipmentSetData' )
  var i2477 = data
  request.r(i2477[0], i2477[1], 0, i2476, 'targetSkeletonDataAsset')
  var i2479 = i2477[2]
  var i2478 = new (System.Collections.Generic.List$1(Bridge.ns('System.String')))
  for(var i = 0; i < i2479.length; i += 1) {
    i2478.add(i2479[i + 0]);
  }
  i2476.skinNames = i2478
  return i2476
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i2480 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i2481 = data
  i2480.useSafeMode = !!i2481[0]
  i2480.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i2481[1], i2480.safeModeOptions)
  i2480.timeScale = i2481[2]
  i2480.unscaledTimeScale = i2481[3]
  i2480.useSmoothDeltaTime = !!i2481[4]
  i2480.maxSmoothUnscaledTime = i2481[5]
  i2480.rewindCallbackMode = i2481[6]
  i2480.showUnityEditorReport = !!i2481[7]
  i2480.logBehaviour = i2481[8]
  i2480.drawGizmos = !!i2481[9]
  i2480.defaultRecyclable = !!i2481[10]
  i2480.defaultAutoPlay = i2481[11]
  i2480.defaultUpdateType = i2481[12]
  i2480.defaultTimeScaleIndependent = !!i2481[13]
  i2480.defaultEaseType = i2481[14]
  i2480.defaultEaseOvershootOrAmplitude = i2481[15]
  i2480.defaultEasePeriod = i2481[16]
  i2480.defaultAutoKill = !!i2481[17]
  i2480.defaultLoopType = i2481[18]
  i2480.debugMode = !!i2481[19]
  i2480.debugStoreTargetId = !!i2481[20]
  i2480.showPreviewPanel = !!i2481[21]
  i2480.storeSettingsLocation = i2481[22]
  i2480.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i2481[23], i2480.modules)
  i2480.createASMDEF = !!i2481[24]
  i2480.showPlayingTweens = !!i2481[25]
  i2480.showPausedTweens = !!i2481[26]
  return i2480
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i2482 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i2483 = data
  i2482.logBehaviour = i2483[0]
  i2482.nestedTweenFailureBehaviour = i2483[1]
  return i2482
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i2484 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i2485 = data
  i2484.showPanel = !!i2485[0]
  i2484.audioEnabled = !!i2485[1]
  i2484.physicsEnabled = !!i2485[2]
  i2484.physics2DEnabled = !!i2485[3]
  i2484.spriteEnabled = !!i2485[4]
  i2484.uiEnabled = !!i2485[5]
  i2484.uiToolkitEnabled = !!i2485[6]
  i2484.textMeshProEnabled = !!i2485[7]
  i2484.tk2DEnabled = !!i2485[8]
  i2484.deAudioEnabled = !!i2485[9]
  i2484.deUnityExtendedEnabled = !!i2485[10]
  i2484.epoOutlineEnabled = !!i2485[11]
  return i2484
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i2486 = root || request.c( 'TMPro.TMP_Settings' )
  var i2487 = data
  i2486.assetVersion = i2487[0]
  i2486.m_TextWrappingMode = i2487[1]
  i2486.m_enableKerning = !!i2487[2]
  var i2489 = i2487[3]
  var i2488 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i2489.length; i += 1) {
    i2488.add(i2489[i + 0]);
  }
  i2486.m_ActiveFontFeatures = i2488
  i2486.m_enableExtraPadding = !!i2487[4]
  i2486.m_enableTintAllSprites = !!i2487[5]
  i2486.m_enableParseEscapeCharacters = !!i2487[6]
  i2486.m_EnableRaycastTarget = !!i2487[7]
  i2486.m_GetFontFeaturesAtRuntime = !!i2487[8]
  i2486.m_missingGlyphCharacter = i2487[9]
  i2486.m_ClearDynamicDataOnBuild = !!i2487[10]
  i2486.m_warningsDisabled = !!i2487[11]
  request.r(i2487[12], i2487[13], 0, i2486, 'm_defaultFontAsset')
  i2486.m_defaultFontAssetPath = i2487[14]
  i2486.m_defaultFontSize = i2487[15]
  i2486.m_defaultAutoSizeMinRatio = i2487[16]
  i2486.m_defaultAutoSizeMaxRatio = i2487[17]
  i2486.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i2487[18], i2487[19] )
  i2486.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i2487[20], i2487[21] )
  i2486.m_autoSizeTextContainer = !!i2487[22]
  i2486.m_IsTextObjectScaleStatic = !!i2487[23]
  var i2491 = i2487[24]
  var i2490 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i2491.length; i += 2) {
  request.r(i2491[i + 0], i2491[i + 1], 1, i2490, '')
  }
  i2486.m_fallbackFontAssets = i2490
  i2486.m_matchMaterialPreset = !!i2487[25]
  i2486.m_HideSubTextObjects = !!i2487[26]
  request.r(i2487[27], i2487[28], 0, i2486, 'm_defaultSpriteAsset')
  i2486.m_defaultSpriteAssetPath = i2487[29]
  i2486.m_enableEmojiSupport = !!i2487[30]
  i2486.m_MissingCharacterSpriteUnicode = i2487[31]
  var i2493 = i2487[32]
  var i2492 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i2493.length; i += 2) {
  request.r(i2493[i + 0], i2493[i + 1], 1, i2492, '')
  }
  i2486.m_EmojiFallbackTextAssets = i2492
  i2486.m_defaultColorGradientPresetsPath = i2487[33]
  request.r(i2487[34], i2487[35], 0, i2486, 'm_defaultStyleSheet')
  i2486.m_StyleSheetsResourcePath = i2487[36]
  request.r(i2487[37], i2487[38], 0, i2486, 'm_leadingCharacters')
  request.r(i2487[39], i2487[40], 0, i2486, 'm_followingCharacters')
  i2486.m_UseModernHangulLineBreakingRules = !!i2487[41]
  return i2486
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i2496 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i2497 = data
  request.r(i2497[0], i2497[1], 0, i2496, 'spriteSheet')
  var i2499 = i2497[2]
  var i2498 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i2499.length; i += 1) {
    i2498.add(request.d('TMPro.TMP_Sprite', i2499[i + 0]));
  }
  i2496.spriteInfoList = i2498
  var i2501 = i2497[3]
  var i2500 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i2501.length; i += 2) {
  request.r(i2501[i + 0], i2501[i + 1], 1, i2500, '')
  }
  i2496.fallbackSpriteAssets = i2500
  var i2503 = i2497[4]
  var i2502 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i2503.length; i += 1) {
    i2502.add(request.d('TMPro.TMP_SpriteCharacter', i2503[i + 0]));
  }
  i2496.m_SpriteCharacterTable = i2502
  var i2505 = i2497[5]
  var i2504 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i2505.length; i += 1) {
    i2504.add(request.d('TMPro.TMP_SpriteGlyph', i2505[i + 0]));
  }
  i2496.m_GlyphTable = i2504
  i2496.m_Version = i2497[6]
  i2496.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i2497[7], i2496.m_FaceInfo)
  request.r(i2497[8], i2497[9], 0, i2496, 'm_Material')
  return i2496
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i2508 = root || request.c( 'TMPro.TMP_Sprite' )
  var i2509 = data
  i2508.name = i2509[0]
  i2508.hashCode = i2509[1]
  i2508.unicode = i2509[2]
  i2508.pivot = new pc.Vec2( i2509[3], i2509[4] )
  request.r(i2509[5], i2509[6], 0, i2508, 'sprite')
  i2508.id = i2509[7]
  i2508.x = i2509[8]
  i2508.y = i2509[9]
  i2508.width = i2509[10]
  i2508.height = i2509[11]
  i2508.xOffset = i2509[12]
  i2508.yOffset = i2509[13]
  i2508.xAdvance = i2509[14]
  i2508.scale = i2509[15]
  return i2508
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i2514 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i2515 = data
  i2514.m_Name = i2515[0]
  i2514.m_ElementType = i2515[1]
  i2514.m_Unicode = i2515[2]
  i2514.m_GlyphIndex = i2515[3]
  i2514.m_Scale = i2515[4]
  return i2514
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i2518 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i2519 = data
  request.r(i2519[0], i2519[1], 0, i2518, 'sprite')
  i2518.m_Index = i2519[2]
  i2518.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i2519[3], i2518.m_Metrics)
  i2518.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i2519[4], i2518.m_GlyphRect)
  i2518.m_Scale = i2519[5]
  i2518.m_AtlasIndex = i2519[6]
  i2518.m_ClassDefinitionType = i2519[7]
  return i2518
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i2520 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i2521 = data
  i2520.m_Width = i2521[0]
  i2520.m_Height = i2521[1]
  i2520.m_HorizontalBearingX = i2521[2]
  i2520.m_HorizontalBearingY = i2521[3]
  i2520.m_HorizontalAdvance = i2521[4]
  return i2520
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i2522 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i2523 = data
  var i2525 = i2523[0]
  var i2524 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i2525.length; i += 1) {
    i2524.add(request.d('TMPro.TMP_Style', i2525[i + 0]));
  }
  i2522.m_StyleList = i2524
  return i2522
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i2528 = root || request.c( 'TMPro.TMP_Style' )
  var i2529 = data
  i2528.m_Name = i2529[0]
  i2528.m_HashCode = i2529[1]
  i2528.m_OpeningDefinition = i2529[2]
  i2528.m_ClosingDefinition = i2529[3]
  i2528.m_OpeningTagArray = i2529[4]
  i2528.m_ClosingTagArray = i2529[5]
  return i2528
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i2530 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i2531 = data
  var i2533 = i2531[0]
  var i2532 = []
  for(var i = 0; i < i2533.length; i += 1) {
    i2532.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i2533[i + 0]) );
  }
  i2530.files = i2532
  i2530.componentToPrefabIds = i2531[1]
  return i2530
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i2536 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i2537 = data
  i2536.path = i2537[0]
  request.r(i2537[1], i2537[2], 0, i2536, 'unityObject')
  return i2536
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i2538 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i2539 = data
  var i2541 = i2539[0]
  var i2540 = []
  for(var i = 0; i < i2541.length; i += 1) {
    i2540.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i2541[i + 0]) );
  }
  i2538.scriptsExecutionOrder = i2540
  var i2543 = i2539[1]
  var i2542 = []
  for(var i = 0; i < i2543.length; i += 1) {
    i2542.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i2543[i + 0]) );
  }
  i2538.sortingLayers = i2542
  var i2545 = i2539[2]
  var i2544 = []
  for(var i = 0; i < i2545.length; i += 1) {
    i2544.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i2545[i + 0]) );
  }
  i2538.cullingLayers = i2544
  i2538.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i2539[3], i2538.timeSettings)
  i2538.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i2539[4], i2538.physicsSettings)
  i2538.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i2539[5], i2538.physics2DSettings)
  i2538.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i2539[6], i2538.qualitySettings)
  i2538.enableRealtimeShadows = !!i2539[7]
  i2538.enableAutoInstancing = !!i2539[8]
  i2538.enableStaticBatching = !!i2539[9]
  i2538.enableDynamicBatching = !!i2539[10]
  i2538.lightmapEncodingQuality = i2539[11]
  i2538.desiredColorSpace = i2539[12]
  var i2547 = i2539[13]
  var i2546 = []
  for(var i = 0; i < i2547.length; i += 1) {
    i2546.push( i2547[i + 0] );
  }
  i2538.allTags = i2546
  return i2538
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i2550 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i2551 = data
  i2550.name = i2551[0]
  i2550.value = i2551[1]
  return i2550
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i2554 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i2555 = data
  i2554.id = i2555[0]
  i2554.name = i2555[1]
  i2554.value = i2555[2]
  return i2554
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i2558 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i2559 = data
  i2558.id = i2559[0]
  i2558.name = i2559[1]
  return i2558
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i2560 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i2561 = data
  i2560.fixedDeltaTime = i2561[0]
  i2560.maximumDeltaTime = i2561[1]
  i2560.timeScale = i2561[2]
  i2560.maximumParticleTimestep = i2561[3]
  return i2560
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i2562 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i2563 = data
  i2562.gravity = new pc.Vec3( i2563[0], i2563[1], i2563[2] )
  i2562.defaultSolverIterations = i2563[3]
  i2562.bounceThreshold = i2563[4]
  i2562.autoSyncTransforms = !!i2563[5]
  i2562.autoSimulation = !!i2563[6]
  var i2565 = i2563[7]
  var i2564 = []
  for(var i = 0; i < i2565.length; i += 1) {
    i2564.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i2565[i + 0]) );
  }
  i2562.collisionMatrix = i2564
  return i2562
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i2568 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i2569 = data
  i2568.enabled = !!i2569[0]
  i2568.layerId = i2569[1]
  i2568.otherLayerId = i2569[2]
  return i2568
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i2570 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i2571 = data
  request.r(i2571[0], i2571[1], 0, i2570, 'material')
  i2570.gravity = new pc.Vec2( i2571[2], i2571[3] )
  i2570.positionIterations = i2571[4]
  i2570.velocityIterations = i2571[5]
  i2570.velocityThreshold = i2571[6]
  i2570.maxLinearCorrection = i2571[7]
  i2570.maxAngularCorrection = i2571[8]
  i2570.maxTranslationSpeed = i2571[9]
  i2570.maxRotationSpeed = i2571[10]
  i2570.baumgarteScale = i2571[11]
  i2570.baumgarteTOIScale = i2571[12]
  i2570.timeToSleep = i2571[13]
  i2570.linearSleepTolerance = i2571[14]
  i2570.angularSleepTolerance = i2571[15]
  i2570.defaultContactOffset = i2571[16]
  i2570.autoSimulation = !!i2571[17]
  i2570.queriesHitTriggers = !!i2571[18]
  i2570.queriesStartInColliders = !!i2571[19]
  i2570.callbacksOnDisable = !!i2571[20]
  i2570.reuseCollisionCallbacks = !!i2571[21]
  i2570.autoSyncTransforms = !!i2571[22]
  var i2573 = i2571[23]
  var i2572 = []
  for(var i = 0; i < i2573.length; i += 1) {
    i2572.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i2573[i + 0]) );
  }
  i2570.collisionMatrix = i2572
  return i2570
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i2576 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i2577 = data
  i2576.enabled = !!i2577[0]
  i2576.layerId = i2577[1]
  i2576.otherLayerId = i2577[2]
  return i2576
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i2578 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i2579 = data
  var i2581 = i2579[0]
  var i2580 = []
  for(var i = 0; i < i2581.length; i += 1) {
    i2580.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i2581[i + 0]) );
  }
  i2578.qualityLevels = i2580
  var i2583 = i2579[1]
  var i2582 = []
  for(var i = 0; i < i2583.length; i += 1) {
    i2582.push( i2583[i + 0] );
  }
  i2578.names = i2582
  i2578.shadows = i2579[2]
  i2578.anisotropicFiltering = i2579[3]
  i2578.antiAliasing = i2579[4]
  i2578.lodBias = i2579[5]
  i2578.shadowCascades = i2579[6]
  i2578.shadowDistance = i2579[7]
  i2578.shadowmaskMode = i2579[8]
  i2578.shadowProjection = i2579[9]
  i2578.shadowResolution = i2579[10]
  i2578.softParticles = !!i2579[11]
  i2578.softVegetation = !!i2579[12]
  i2578.activeColorSpace = i2579[13]
  i2578.desiredColorSpace = i2579[14]
  i2578.masterTextureLimit = i2579[15]
  i2578.maxQueuedFrames = i2579[16]
  i2578.particleRaycastBudget = i2579[17]
  i2578.pixelLightCount = i2579[18]
  i2578.realtimeReflectionProbes = !!i2579[19]
  i2578.shadowCascade2Split = i2579[20]
  i2578.shadowCascade4Split = new pc.Vec3( i2579[21], i2579[22], i2579[23] )
  i2578.streamingMipmapsActive = !!i2579[24]
  i2578.vSyncCount = i2579[25]
  i2578.asyncUploadBufferSize = i2579[26]
  i2578.asyncUploadTimeSlice = i2579[27]
  i2578.billboardsFaceCameraPosition = !!i2579[28]
  i2578.shadowNearPlaneOffset = i2579[29]
  i2578.streamingMipmapsMemoryBudget = i2579[30]
  i2578.maximumLODLevel = i2579[31]
  i2578.streamingMipmapsAddAllCameras = !!i2579[32]
  i2578.streamingMipmapsMaxLevelReduction = i2579[33]
  i2578.streamingMipmapsRenderersPerFrame = i2579[34]
  i2578.resolutionScalingFixedDPIFactor = i2579[35]
  i2578.streamingMipmapsMaxFileIORequests = i2579[36]
  i2578.currentQualityLevel = i2579[37]
  return i2578
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i2588 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i2589 = data
  i2588.weight = i2589[0]
  i2588.vertices = i2589[1]
  i2588.normals = i2589[2]
  i2588.tangents = i2589[3]
  return i2588
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition"] = function (request, data, root) {
  var i2592 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition' )
  var i2593 = data
  i2592.mode = i2593[0]
  i2592.parameter = i2593[1]
  i2592.threshold = i2593[2]
  return i2592
}

Deserializers["TMPro.GlyphAnchorPoint"] = function (request, data, root) {
  var i2594 = root || request.c( 'TMPro.GlyphAnchorPoint' )
  var i2595 = data
  i2594.m_XCoordinate = i2595[0]
  i2594.m_YCoordinate = i2595[1]
  return i2594
}

Deserializers["TMPro.MarkPositionAdjustment"] = function (request, data, root) {
  var i2596 = root || request.c( 'TMPro.MarkPositionAdjustment' )
  var i2597 = data
  i2596.m_XPositionAdjustment = i2597[0]
  i2596.m_YPositionAdjustment = i2597[1]
  return i2596
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i2598 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i2599 = data
  i2598.xPlacement = i2599[0]
  i2598.yPlacement = i2599[1]
  i2598.xAdvance = i2599[2]
  i2598.yAdvance = i2599[3]
  return i2598
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"useSimplification":2,"useUInt32IndexFormat":3,"vertexCount":4,"aabb":5,"streams":6,"vertices":7,"subMeshes":8,"bindposes":9,"blendShapes":10},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Components.Transform":{"position":0,"scale":3,"rotation":6},"Luna.Unity.DTO.UnityEngine.Components.Animator":{"animatorController":0,"avatar":2,"updateMode":4,"hasTransformHierarchy":5,"applyRootMotion":6,"humanBones":7,"enabled":8},"Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer":{"color":0,"sprite":4,"flipX":6,"flipY":7,"drawMode":8,"size":9,"tileMode":11,"adaptiveModeThreshold":12,"maskInteraction":13,"spriteSortPoint":14,"enabled":15,"sharedMaterial":16,"sharedMaterials":18,"receiveShadows":19,"shadowCastingMode":20,"sortingLayerID":21,"sortingOrder":22,"lightmapIndex":23,"lightmapSceneIndex":24,"lightmapScaleOffset":25,"lightProbeUsage":29,"reflectionProbeUsage":30},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider":{"center":0,"radius":3,"height":4,"direction":5,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"referenceAmbientProbe":36,"useReferenceAmbientProbe":37,"customReflection":38,"defaultReflection":40,"defaultReflectionMode":42,"defaultReflectionResolution":43,"sunLightObjectId":44,"pixelLightCount":45,"defaultReflectionHDR":46,"hasLightDataAsset":47,"hasManualGenerate":48},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip":{"name":0,"wrapMode":1,"isLooping":2,"length":3,"curves":4,"events":5,"halfPrecision":6,"_frameRate":7,"localBounds":8,"hasMuscleCurves":9,"clipMuscleConstant":10,"clipBindingConstant":11},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve":{"path":0,"hash":1,"componentType":2,"property":3,"keys":4,"objectReferenceKeys":5},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey":{"time":0,"value":1},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent":{"functionName":0,"floatParameter":1,"intParameter":2,"stringParameter":3,"objectReferenceParameter":4,"time":6},"Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds":{"center":0,"extends":3},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant":{"genericBindings":0,"pptrCurveMapping":1},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController":{"name":0,"layers":1,"parameters":2,"animationClips":3,"avatarUnsupported":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer":{"name":0,"defaultWeight":1,"blendingMode":2,"avatarMask":3,"syncedLayerIndex":4,"syncedLayerAffectsTiming":5,"syncedLayers":6,"stateMachine":7},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine":{"id":0,"name":1,"path":2,"states":3,"machines":4,"entryStateTransitions":5,"exitStateTransitions":6,"anyStateTransitions":7,"defaultStateId":8},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState":{"id":0,"name":1,"cycleOffset":2,"cycleOffsetParameter":3,"cycleOffsetParameterActive":4,"mirror":5,"mirrorParameter":6,"mirrorParameterActive":7,"motionId":8,"nameHash":9,"fullPathHash":10,"speed":11,"speedParameter":12,"speedParameterActive":13,"tag":14,"tagHash":15,"writeDefaultValues":16,"behaviours":17,"transitions":18},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition":{"fullPath":0,"canTransitionToSelf":1,"duration":2,"exitTime":3,"hasExitTime":4,"hasFixedDuration":5,"interruptionSource":6,"offset":7,"orderedInterruption":8,"destinationStateId":9,"isExit":10,"mute":11,"solo":12,"conditions":13},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition":{"destinationStateId":0,"isExit":1,"mute":2,"solo":3,"conditions":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter":{"defaultBool":0,"defaultFloat":1,"defaultInt":2,"name":3,"nameHash":4,"type":5},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"lightmapEncodingQuality":11,"desiredColorSpace":12,"allTags":13},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition":{"mode":0,"parameter":1,"threshold":2}}

Deserializers.requiredComponents = {"47":[48],"49":[48],"50":[48],"51":[48],"52":[48],"53":[48],"54":[55],"56":[8],"57":[58],"59":[58],"60":[58],"61":[58],"62":[58],"63":[58],"64":[65],"66":[65],"67":[65],"68":[65],"69":[65],"70":[65],"71":[65],"72":[65],"73":[65],"74":[65],"75":[65],"76":[65],"77":[65],"78":[8],"79":[28],"80":[81],"82":[81],"83":[27],"11":[8],"84":[85],"86":[27],"87":[88,27],"37":[28],"89":[88,27],"90":[3,28],"91":[28],"92":[28,35],"93":[58],"94":[65],"95":[85],"96":[97],"98":[5],"99":[8],"100":[101],"102":[38],"103":[83],"104":[27],"30":[28,27],"105":[27,88],"106":[27],"107":[88,27],"108":[28],"109":[88,27],"110":[27],"111":[112],"113":[112],"114":[112],"115":[27],"116":[27],"117":[83],"118":[88,27],"119":[27],"120":[83],"121":[27],"122":[27],"123":[27],"124":[27],"125":[27],"126":[27],"127":[27],"128":[27],"129":[27],"130":[88,27],"131":[27],"132":[27],"133":[27],"134":[27],"135":[88,27],"136":[27],"137":[38],"138":[38],"39":[38],"139":[38],"140":[8],"141":[8]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Texture2D","UnityEngine.Transform","UnityEngine.Animator","UnityEditor.Animations.AnimatorController","UnityEngine.SpriteRenderer","UnityEngine.Sprite","UnityEngine.Material","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.MonoBehaviour","AutoCameraFit","CharacterManager","Character","EquipmentSetData","Spine.Unity.SkeletonDataAsset","GameManager","SlotManager","SlotSetup","UnityEngine.GameObject","Ply_Pool","Ply_SoundManager","UnityEngine.AudioClip","UnityEngine.AudioSource","ProgressTrackingManager","ScreenHeightPositionAnchor","SlotDataSO","UnityEngine.RectTransform","UnityEngine.MeshRenderer","UnityEngine.EventSystems.UIBehaviour","TMPro.TextMeshPro","TMPro.TMP_FontAsset","UnityEngine.CapsuleCollider","BalloonController","BalloonActionTrigger","UnityEngine.MeshFilter","UnityEngine.Mesh","Spine.Unity.SkeletonAnimation","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","Spine.Unity.SpineAtlasAsset","UnityEngine.TextAsset","UnityEngine.Font","DG.Tweening.Core.DOTweenSettings","TMPro.TMP_Settings","TMPro.TMP_SpriteAsset","TMPro.TMP_StyleSheet","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.SkinnedMeshRenderer","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.Canvas","Spine.Unity.EditorSkeletonPlayer","Spine.Unity.ISkeletonAnimation","Spine.Unity.BoneFollowerGraphic","Spine.Unity.SkeletonSubmeshGraphic","UnityEngine.CanvasRenderer","Spine.Unity.SkeletonGraphic","Spine.Unity.SkeletonMecanim","Spine.Unity.SkeletonRenderer","Spine.Unity.SkeletonPartsRenderer","Spine.Unity.FollowLocationRigidbody","Spine.Unity.FollowLocationRigidbody2D","Spine.Unity.SkeletonUtility","Spine.Unity.SkeletonUtilityConstraint","Spine.Unity.SkeletonUtilityBone","UnityEngine.U2D.Animation.SpriteSkin","UnityEngine.U2D.PixelPerfectCamera","UnityEngine.U2D.SpriteShapeController","UnityEngine.U2D.SpriteShapeRenderer","UnityEngine.InputSystem.UI.InputSystemUIInputModule","UnityEngine.InputSystem.UI.TrackedDeviceRaycaster","TMPro.TextContainer","TMPro.TextMeshProUGUI","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.GraphicRaycaster","UnityEngine.UI.Image","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.CanvasScaler","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.Mask","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.Scrollbar","UnityEngine.UI.ScrollRect","UnityEngine.UI.Slider","UnityEngine.UI.Text","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.38f1";

Deserializers.productName = "PLY_LeftOrRight";

Deserializers.lunaInitializationTime = "07/24/2026 10:13:04";

Deserializers.lunaDaysRunning = "3.8";

Deserializers.lunaVersion = "7.1.0";

Deserializers.lunaSHA = "cf93782349542fe0b84ad13951a26809f8419628";

Deserializers.creativeName = "LeftOrRight_Ply3";

Deserializers.lunaAppID = "33393";

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

Deserializers.runtimeAnalysisExcludedMethodsCount = "5421";

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

Deserializers.buildID = "0421e304-dcc6-4e6b-879f-40842433e637";

Deserializers.runtimeInitializeOnLoadInfos = [[["Unity","Services","Core","Internal","UnityServicesInitializer","EnableServicesInitializationAsync"],["UnityEngine","U2D","Animation","GpuDeformationSystem","CreateFallbackBuffer"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["DG","Tweening","DOTween","RuntimeOnLoad"],["Sirenix","Utilities","UnityVersion","EnsureLoaded"],["Sirenix","Serialization","Utilities","UnityVersion","EnsureLoaded"],["Sirenix","Serialization","UnitySerializationInitializer","InitializeRuntime"],["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["Unity","Services","Core","Registration","CorePackageInitializer","InitializeOnLoad"],["Unity","Services","Core","Internal","TaskAsyncOperation","SetScheduler"],["Unity","Services","Core","Environments","Client","Scheduler","EngineStateHelper","Init"],["Unity","Services","Core","Environments","Client","Scheduler","ThreadHelper","Init"],["Ua2CoreInitializeCallback","Register"],["UnityEngine","InputSystem","InputSystem","RunInitialUpdate"],["Unity","AI","Navigation","NavMeshLink","ClearTrackedList"],["Unity","AI","Navigation","NavMeshSurface","ClearNavMeshSurfaces"],["Unity","AI","Navigation","NavMeshModifierVolume","ClearNavMeshModifiers"],["Unity","AI","Navigation","NavMeshModifier","ClearNavMeshModifiers"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["Unity","Services","Core","Internal","UnityServicesInitializer","CreateStaticInstance"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"]],[["Unity","Services","Core","Environments","Client","Http","JsonHelpers","RegisterTypesForAOT"]],[["Unity","Services","Core","UnityThreadUtils","CaptureUnityThreadInfo"],["UnityEngine","InputSystem","Plugins","InputForUI","InputSystemProvider","Bootstrap"],["UnityEngine","InputSystem","InputSystem","RunInitializeInPlayer"],["Spine","Unity","AttachmentTools","AtlasUtilities","Init"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

