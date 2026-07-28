var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i650 = root || request.c( 'UnityEngine.JointSpring' )
  var i651 = data
  i650.spring = i651[0]
  i650.damper = i651[1]
  i650.targetPosition = i651[2]
  return i650
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i652 = root || request.c( 'UnityEngine.JointMotor' )
  var i653 = data
  i652.m_TargetVelocity = i653[0]
  i652.m_Force = i653[1]
  i652.m_FreeSpin = i653[2]
  return i652
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i654 = root || request.c( 'UnityEngine.JointLimits' )
  var i655 = data
  i654.m_Min = i655[0]
  i654.m_Max = i655[1]
  i654.m_Bounciness = i655[2]
  i654.m_BounceMinVelocity = i655[3]
  i654.m_ContactDistance = i655[4]
  i654.minBounce = i655[5]
  i654.maxBounce = i655[6]
  return i654
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i656 = root || request.c( 'UnityEngine.JointDrive' )
  var i657 = data
  i656.m_PositionSpring = i657[0]
  i656.m_PositionDamper = i657[1]
  i656.m_MaximumForce = i657[2]
  i656.m_UseAcceleration = i657[3]
  return i656
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i658 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i659 = data
  i658.m_Spring = i659[0]
  i658.m_Damper = i659[1]
  return i658
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i660 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i661 = data
  i660.m_Limit = i661[0]
  i660.m_Bounciness = i661[1]
  i660.m_ContactDistance = i661[2]
  return i660
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i662 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i663 = data
  i662.m_ExtremumSlip = i663[0]
  i662.m_ExtremumValue = i663[1]
  i662.m_AsymptoteSlip = i663[2]
  i662.m_AsymptoteValue = i663[3]
  i662.m_Stiffness = i663[4]
  return i662
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i664 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i665 = data
  i664.m_LowerAngle = i665[0]
  i664.m_UpperAngle = i665[1]
  return i664
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i666 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i667 = data
  i666.m_MotorSpeed = i667[0]
  i666.m_MaximumMotorTorque = i667[1]
  return i666
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i668 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i669 = data
  i668.m_DampingRatio = i669[0]
  i668.m_Frequency = i669[1]
  i668.m_Angle = i669[2]
  return i668
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i670 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i671 = data
  i670.m_LowerTranslation = i671[0]
  i670.m_UpperTranslation = i671[1]
  return i670
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i672 = root || new pc.UnityMaterial()
  var i673 = data
  i672.name = i673[0]
  request.r(i673[1], i673[2], 0, i672, 'shader')
  i672.renderQueue = i673[3]
  i672.enableInstancing = !!i673[4]
  var i675 = i673[5]
  var i674 = []
  for(var i = 0; i < i675.length; i += 1) {
    i674.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i675[i + 0]) );
  }
  i672.floatParameters = i674
  var i677 = i673[6]
  var i676 = []
  for(var i = 0; i < i677.length; i += 1) {
    i676.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i677[i + 0]) );
  }
  i672.colorParameters = i676
  var i679 = i673[7]
  var i678 = []
  for(var i = 0; i < i679.length; i += 1) {
    i678.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i679[i + 0]) );
  }
  i672.vectorParameters = i678
  var i681 = i673[8]
  var i680 = []
  for(var i = 0; i < i681.length; i += 1) {
    i680.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i681[i + 0]) );
  }
  i672.textureParameters = i680
  var i683 = i673[9]
  var i682 = []
  for(var i = 0; i < i683.length; i += 1) {
    i682.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i683[i + 0]) );
  }
  i672.materialFlags = i682
  return i672
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i686 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i687 = data
  i686.name = i687[0]
  i686.value = i687[1]
  return i686
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i690 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i691 = data
  i690.name = i691[0]
  i690.value = new pc.Color(i691[1], i691[2], i691[3], i691[4])
  return i690
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i694 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i695 = data
  i694.name = i695[0]
  i694.value = new pc.Vec4( i695[1], i695[2], i695[3], i695[4] )
  return i694
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i698 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i699 = data
  i698.name = i699[0]
  request.r(i699[1], i699[2], 0, i698, 'value')
  return i698
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i702 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i703 = data
  i702.name = i703[0]
  i702.enabled = !!i703[1]
  return i702
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i704 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i705 = data
  i704.name = i705[0]
  i704.width = i705[1]
  i704.height = i705[2]
  i704.mipmapCount = i705[3]
  i704.anisoLevel = i705[4]
  i704.filterMode = i705[5]
  i704.hdr = !!i705[6]
  i704.format = i705[7]
  i704.wrapMode = i705[8]
  i704.alphaIsTransparency = !!i705[9]
  i704.alphaSource = i705[10]
  i704.graphicsFormat = i705[11]
  i704.sRGBTexture = !!i705[12]
  i704.desiredColorSpace = i705[13]
  i704.wrapU = i705[14]
  i704.wrapV = i705[15]
  return i704
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i706 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i707 = data
  i706.name = i707[0]
  i706.halfPrecision = !!i707[1]
  i706.useSimplification = !!i707[2]
  i706.useUInt32IndexFormat = !!i707[3]
  i706.vertexCount = i707[4]
  i706.aabb = i707[5]
  var i709 = i707[6]
  var i708 = []
  for(var i = 0; i < i709.length; i += 1) {
    i708.push( !!i709[i + 0] );
  }
  i706.streams = i708
  i706.vertices = i707[7]
  var i711 = i707[8]
  var i710 = []
  for(var i = 0; i < i711.length; i += 1) {
    i710.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i711[i + 0]) );
  }
  i706.subMeshes = i710
  var i713 = i707[9]
  var i712 = []
  for(var i = 0; i < i713.length; i += 16) {
    i712.push( new pc.Mat4().setData(i713[i + 0], i713[i + 1], i713[i + 2], i713[i + 3],  i713[i + 4], i713[i + 5], i713[i + 6], i713[i + 7],  i713[i + 8], i713[i + 9], i713[i + 10], i713[i + 11],  i713[i + 12], i713[i + 13], i713[i + 14], i713[i + 15]) );
  }
  i706.bindposes = i712
  var i715 = i707[10]
  var i714 = []
  for(var i = 0; i < i715.length; i += 1) {
    i714.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i715[i + 0]) );
  }
  i706.blendShapes = i714
  return i706
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i720 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i721 = data
  i720.triangles = i721[0]
  return i720
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i726 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i727 = data
  i726.name = i727[0]
  var i729 = i727[1]
  var i728 = []
  for(var i = 0; i < i729.length; i += 1) {
    i728.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i729[i + 0]) );
  }
  i726.frames = i728
  return i726
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Transform"] = function (request, data, root) {
  var i730 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Transform' )
  var i731 = data
  i730.position = new pc.Vec3( i731[0], i731[1], i731[2] )
  i730.scale = new pc.Vec3( i731[3], i731[4], i731[5] )
  i730.rotation = new pc.Quat(i731[6], i731[7], i731[8], i731[9])
  return i730
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Animator"] = function (request, data, root) {
  var i732 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Animator' )
  var i733 = data
  request.r(i733[0], i733[1], 0, i732, 'animatorController')
  request.r(i733[2], i733[3], 0, i732, 'avatar')
  i732.updateMode = i733[4]
  i732.hasTransformHierarchy = !!i733[5]
  i732.applyRootMotion = !!i733[6]
  var i735 = i733[7]
  var i734 = []
  for(var i = 0; i < i735.length; i += 2) {
  request.r(i735[i + 0], i735[i + 1], 2, i734, '')
  }
  i732.humanBones = i734
  i732.enabled = !!i733[8]
  return i732
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer"] = function (request, data, root) {
  var i738 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer' )
  var i739 = data
  i738.color = new pc.Color(i739[0], i739[1], i739[2], i739[3])
  request.r(i739[4], i739[5], 0, i738, 'sprite')
  i738.flipX = !!i739[6]
  i738.flipY = !!i739[7]
  i738.drawMode = i739[8]
  i738.size = new pc.Vec2( i739[9], i739[10] )
  i738.tileMode = i739[11]
  i738.adaptiveModeThreshold = i739[12]
  i738.maskInteraction = i739[13]
  i738.spriteSortPoint = i739[14]
  i738.enabled = !!i739[15]
  request.r(i739[16], i739[17], 0, i738, 'sharedMaterial')
  var i741 = i739[18]
  var i740 = []
  for(var i = 0; i < i741.length; i += 2) {
  request.r(i741[i + 0], i741[i + 1], 2, i740, '')
  }
  i738.sharedMaterials = i740
  i738.receiveShadows = !!i739[19]
  i738.shadowCastingMode = i739[20]
  i738.sortingLayerID = i739[21]
  i738.sortingOrder = i739[22]
  i738.lightmapIndex = i739[23]
  i738.lightmapSceneIndex = i739[24]
  i738.lightmapScaleOffset = new pc.Vec4( i739[25], i739[26], i739[27], i739[28] )
  i738.lightProbeUsage = i739[29]
  i738.reflectionProbeUsage = i739[30]
  return i738
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i744 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i745 = data
  i744.name = i745[0]
  i744.tagId = i745[1]
  i744.enabled = !!i745[2]
  i744.isStatic = !!i745[3]
  i744.layer = i745[4]
  return i744
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i746 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i747 = data
  i746.name = i747[0]
  i746.index = i747[1]
  i746.startup = !!i747[2]
  return i746
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i748 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i749 = data
  i748.aspect = i749[0]
  i748.orthographic = !!i749[1]
  i748.orthographicSize = i749[2]
  i748.backgroundColor = new pc.Color(i749[3], i749[4], i749[5], i749[6])
  i748.nearClipPlane = i749[7]
  i748.farClipPlane = i749[8]
  i748.fieldOfView = i749[9]
  i748.depth = i749[10]
  i748.clearFlags = i749[11]
  i748.cullingMask = i749[12]
  i748.rect = i749[13]
  request.r(i749[14], i749[15], 0, i748, 'targetTexture')
  i748.usePhysicalProperties = !!i749[16]
  i748.focalLength = i749[17]
  i748.sensorSize = new pc.Vec2( i749[18], i749[19] )
  i748.lensShift = new pc.Vec2( i749[20], i749[21] )
  i748.gateFit = i749[22]
  i748.commandBufferCount = i749[23]
  i748.cameraType = i749[24]
  i748.enabled = !!i749[25]
  return i748
}

Deserializers["AutoCameraFit"] = function (request, data, root) {
  var i750 = root || request.c( 'AutoCameraFit' )
  var i751 = data
  request.r(i751[0], i751[1], 0, i750, 'tallScreenObject')
  i750.tallScreenRatioThreshold = i751[2]
  i750.tallScreenYOffset = i751[3]
  request.r(i751[4], i751[5], 0, i750, 'canvasBtn')
  request.r(i751[6], i751[7], 0, i750, 'targetArea')
  i750.paddingLandscape = i751[8]
  i750.paddingPortrait = i751[9]
  i750.extraPaddingSmallScreen = i751[10]
  i750.smallScreenThreshold = i751[11]
  i750.autoUpdateOnResize = !!i751[12]
  i750.adjustInEditMode = !!i751[13]
  return i750
}

Deserializers["CharacterManager"] = function (request, data, root) {
  var i752 = root || request.c( 'CharacterManager' )
  var i753 = data
  var i755 = i753[0]
  var i754 = new (System.Collections.Generic.List$1(Bridge.ns('CharacterEquipmentSetup')))
  for(var i = 0; i < i755.length; i += 1) {
    i754.add(request.d('CharacterEquipmentSetup', i755[i + 0]));
  }
  i752.characterSetups = i754
  request.r(i753[1], i753[2], 0, i752, 'character1')
  request.r(i753[3], i753[4], 0, i752, 'targetTestCharacter')
  request.r(i753[5], i753[6], 0, i752, 'testEquipmentDataAsset')
  var i757 = i753[7]
  var i756 = new (System.Collections.Generic.List$1(Bridge.ns('SkinToggleEntry')))
  for(var i = 0; i < i757.length; i += 1) {
    i756.add(request.d('SkinToggleEntry', i757[i + 0]));
  }
  i752.mySkinSet = i756
  return i752
}

Deserializers["CharacterEquipmentSetup"] = function (request, data, root) {
  var i760 = root || request.c( 'CharacterEquipmentSetup' )
  var i761 = data
  request.r(i761[0], i761[1], 0, i760, 'character')
  request.r(i761[2], i761[3], 0, i760, 'equipmentData')
  return i760
}

Deserializers["SkinToggleEntry"] = function (request, data, root) {
  var i764 = root || request.c( 'SkinToggleEntry' )
  var i765 = data
  i764.isEnabled = !!i765[0]
  i764.skinName = i765[1]
  request.r(i765[2], i765[3], 0, i764, 'skeletonDataAsset')
  return i764
}

Deserializers["GameManager"] = function (request, data, root) {
  var i766 = root || request.c( 'GameManager' )
  var i767 = data
  i766.isGoogleBuild = !!i767[0]
  var i769 = i767[1]
  var i768 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.GameObject')))
  for(var i = 0; i < i769.length; i += 2) {
  request.r(i769[i + 0], i769[i + 1], 1, i768, '')
  }
  i766.googleDisabledObjects = i768
  var i771 = i767[2]
  var i770 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Behaviour')))
  for(var i = 0; i < i771.length; i += 2) {
  request.r(i771[i + 0], i771[i + 1], 1, i770, '')
  }
  i766.googleDisabledBehaviours = i770
  return i766
}

Deserializers["SlotManager"] = function (request, data, root) {
  var i776 = root || request.c( 'SlotManager' )
  var i777 = data
  var i779 = i777[0]
  var i778 = new (System.Collections.Generic.List$1(Bridge.ns('SlotSetup')))
  for(var i = 0; i < i779.length; i += 2) {
  request.r(i779[i + 0], i779[i + 1], 1, i778, '')
  }
  i776.allSlots = i778
  i776.maxSlotsToPlay = i777[1]
  request.r(i777[2], i777[3], 0, i776, 'objectToHideOnFirstClick')
  request.r(i777[4], i777[5], 0, i776, 'rightEffectPrefab')
  request.r(i777[6], i777[7], 0, i776, 'rightEffectSpawnPoint')
  var i781 = i777[8]
  var i780 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Sprite')))
  for(var i = 0; i < i781.length; i += 2) {
  request.r(i781[i + 0], i781[i + 1], 1, i780, '')
  }
  i776.rightEffectSprites = i780
  return i776
}

Deserializers["Ply_Pool"] = function (request, data, root) {
  var i786 = root || request.c( 'Ply_Pool' )
  var i787 = data
  var i789 = i787[0]
  var i788 = []
  for(var i = 0; i < i789.length; i += 1) {
    i788.push( request.d('Ply_Pool+PoolAmount', i789[i + 0]) );
  }
  i786.poolAmounts = i788
  return i786
}

Deserializers["Ply_Pool+PoolAmount"] = function (request, data, root) {
  var i792 = root || request.c( 'Ply_Pool+PoolAmount' )
  var i793 = data
  i792.type = i793[0]
  i792.amount = i793[1]
  request.r(i793[2], i793[3], 0, i792, 'gameUnit')
  return i792
}

Deserializers["Ply_SoundManager"] = function (request, data, root) {
  var i794 = root || request.c( 'Ply_SoundManager' )
  var i795 = data
  i794.fxAudio = request.d('FxAudio', i795[0], i794.fxAudio)
  request.r(i795[1], i795[2], 0, i794, 'bgm')
  return i794
}

Deserializers["FxAudio"] = function (request, data, root) {
  var i796 = root || request.c( 'FxAudio' )
  var i797 = data
  i796.Left = request.d('SoundData', i797[0], i796.Left)
  i796.Right = request.d('SoundData', i797[1], i796.Right)
  i796.Yeah = request.d('SoundData', i797[2], i796.Yeah)
  i796.Click = request.d('SoundData', i797[3], i796.Click)
  return i796
}

Deserializers["SoundData"] = function (request, data, root) {
  var i798 = root || request.c( 'SoundData' )
  var i799 = data
  request.r(i799[0], i799[1], 0, i798, 'clip')
  i798.repeatCount = i799[2]
  return i798
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i800 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i801 = data
  request.r(i801[0], i801[1], 0, i800, 'clip')
  request.r(i801[2], i801[3], 0, i800, 'outputAudioMixerGroup')
  i800.playOnAwake = !!i801[4]
  i800.loop = !!i801[5]
  i800.time = i801[6]
  i800.volume = i801[7]
  i800.pitch = i801[8]
  i800.enabled = !!i801[9]
  return i800
}

Deserializers["ProgressTrackingManager"] = function (request, data, root) {
  var i802 = root || request.c( 'ProgressTrackingManager' )
  var i803 = data
  i802.maxScore = i803[0]
  i802.currentScore = i803[1]
  i802.currentPercent = i803[2]
  return i802
}

Deserializers["ScreenHeightPositionAnchor"] = function (request, data, root) {
  var i804 = root || request.c( 'ScreenHeightPositionAnchor' )
  var i805 = data
  request.r(i805[0], i805[1], 0, i804, 'anchorPoint')
  request.r(i805[2], i805[3], 0, i804, 'targetCamera')
  i804.viewportYRatio = i805[4]
  i804.alignOnStart = !!i805[5]
  i804.alignOnEnable = !!i805[6]
  i804.alwaysUpdate = !!i805[7]
  i804.realignOnScreenSizeChanged = !!i805[8]
  i804.drawGizmos = !!i805[9]
  i804.targetLineColor = new pc.Color(i805[10], i805[11], i805[12], i805[13])
  i804.anchorColor = new pc.Color(i805[14], i805[15], i805[16], i805[17])
  return i804
}

Deserializers["SlotSetup"] = function (request, data, root) {
  var i806 = root || request.c( 'SlotSetup' )
  var i807 = data
  request.r(i807[0], i807[1], 0, i806, 'slotData')
  request.r(i807[2], i807[3], 0, i806, 'borderGold')
  request.r(i807[4], i807[5], 0, i806, 'borderWhite')
  request.r(i807[6], i807[7], 0, i806, 'greyCard')
  request.r(i807[8], i807[9], 0, i806, 'blueCard')
  request.r(i807[10], i807[11], 0, i806, 'greenCard')
  request.r(i807[12], i807[13], 0, i806, 'greenTick')
  request.r(i807[14], i807[15], 0, i806, 'leftBalloonObj')
  request.r(i807[16], i807[17], 0, i806, 'rightBalloonObj')
  request.r(i807[18], i807[19], 0, i806, 'leftBalloonItemRenderer')
  request.r(i807[20], i807[21], 0, i806, 'rightBalloonItemRenderer')
  return i806
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i808 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i809 = data
  i808.pivot = new pc.Vec2( i809[0], i809[1] )
  i808.anchorMin = new pc.Vec2( i809[2], i809[3] )
  i808.anchorMax = new pc.Vec2( i809[4], i809[5] )
  i808.sizeDelta = new pc.Vec2( i809[6], i809[7] )
  i808.anchoredPosition3D = new pc.Vec3( i809[8], i809[9], i809[10] )
  i808.rotation = new pc.Quat(i809[11], i809[12], i809[13], i809[14])
  i808.scale = new pc.Vec3( i809[15], i809[16], i809[17] )
  return i808
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i810 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i811 = data
  request.r(i811[0], i811[1], 0, i810, 'additionalVertexStreams')
  i810.enabled = !!i811[2]
  request.r(i811[3], i811[4], 0, i810, 'sharedMaterial')
  var i813 = i811[5]
  var i812 = []
  for(var i = 0; i < i813.length; i += 2) {
  request.r(i813[i + 0], i813[i + 1], 2, i812, '')
  }
  i810.sharedMaterials = i812
  i810.receiveShadows = !!i811[6]
  i810.shadowCastingMode = i811[7]
  i810.sortingLayerID = i811[8]
  i810.sortingOrder = i811[9]
  i810.lightmapIndex = i811[10]
  i810.lightmapSceneIndex = i811[11]
  i810.lightmapScaleOffset = new pc.Vec4( i811[12], i811[13], i811[14], i811[15] )
  i810.lightProbeUsage = i811[16]
  i810.reflectionProbeUsage = i811[17]
  return i810
}

Deserializers["TMPro.TextMeshPro"] = function (request, data, root) {
  var i814 = root || request.c( 'TMPro.TextMeshPro' )
  var i815 = data
  i814._SortingLayer = i815[0]
  i814._SortingLayerID = i815[1]
  i814._SortingOrder = i815[2]
  i814.m_hasFontAssetChanged = !!i815[3]
  request.r(i815[4], i815[5], 0, i814, 'm_renderer')
  i814.m_maskType = i815[6]
  i814.m_text = i815[7]
  i814.m_isRightToLeft = !!i815[8]
  request.r(i815[9], i815[10], 0, i814, 'm_fontAsset')
  request.r(i815[11], i815[12], 0, i814, 'm_sharedMaterial')
  var i817 = i815[13]
  var i816 = []
  for(var i = 0; i < i817.length; i += 2) {
  request.r(i817[i + 0], i817[i + 1], 2, i816, '')
  }
  i814.m_fontSharedMaterials = i816
  request.r(i815[14], i815[15], 0, i814, 'm_fontMaterial')
  var i819 = i815[16]
  var i818 = []
  for(var i = 0; i < i819.length; i += 2) {
  request.r(i819[i + 0], i819[i + 1], 2, i818, '')
  }
  i814.m_fontMaterials = i818
  i814.m_fontColor32 = UnityEngine.Color32.ConstructColor(i815[17], i815[18], i815[19], i815[20])
  i814.m_fontColor = new pc.Color(i815[21], i815[22], i815[23], i815[24])
  i814.m_enableVertexGradient = !!i815[25]
  i814.m_colorMode = i815[26]
  i814.m_fontColorGradient = request.d('TMPro.VertexGradient', i815[27], i814.m_fontColorGradient)
  request.r(i815[28], i815[29], 0, i814, 'm_fontColorGradientPreset')
  request.r(i815[30], i815[31], 0, i814, 'm_spriteAsset')
  i814.m_tintAllSprites = !!i815[32]
  request.r(i815[33], i815[34], 0, i814, 'm_StyleSheet')
  i814.m_TextStyleHashCode = i815[35]
  i814.m_overrideHtmlColors = !!i815[36]
  i814.m_faceColor = UnityEngine.Color32.ConstructColor(i815[37], i815[38], i815[39], i815[40])
  i814.m_fontSize = i815[41]
  i814.m_fontSizeBase = i815[42]
  i814.m_fontWeight = i815[43]
  i814.m_enableAutoSizing = !!i815[44]
  i814.m_fontSizeMin = i815[45]
  i814.m_fontSizeMax = i815[46]
  i814.m_fontStyle = i815[47]
  i814.m_HorizontalAlignment = i815[48]
  i814.m_VerticalAlignment = i815[49]
  i814.m_textAlignment = i815[50]
  i814.m_characterSpacing = i815[51]
  i814.m_wordSpacing = i815[52]
  i814.m_lineSpacing = i815[53]
  i814.m_lineSpacingMax = i815[54]
  i814.m_paragraphSpacing = i815[55]
  i814.m_charWidthMaxAdj = i815[56]
  i814.m_TextWrappingMode = i815[57]
  i814.m_wordWrappingRatios = i815[58]
  i814.m_overflowMode = i815[59]
  request.r(i815[60], i815[61], 0, i814, 'm_linkedTextComponent')
  request.r(i815[62], i815[63], 0, i814, 'parentLinkedComponent')
  i814.m_enableKerning = !!i815[64]
  var i821 = i815[65]
  var i820 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i821.length; i += 1) {
    i820.add(i821[i + 0]);
  }
  i814.m_ActiveFontFeatures = i820
  i814.m_enableExtraPadding = !!i815[66]
  i814.checkPaddingRequired = !!i815[67]
  i814.m_isRichText = !!i815[68]
  i814.m_parseCtrlCharacters = !!i815[69]
  i814.m_isOrthographic = !!i815[70]
  i814.m_isCullingEnabled = !!i815[71]
  i814.m_horizontalMapping = i815[72]
  i814.m_verticalMapping = i815[73]
  i814.m_uvLineOffset = i815[74]
  i814.m_geometrySortingOrder = i815[75]
  i814.m_IsTextObjectScaleStatic = !!i815[76]
  i814.m_VertexBufferAutoSizeReduction = !!i815[77]
  i814.m_useMaxVisibleDescender = !!i815[78]
  i814.m_pageToDisplay = i815[79]
  i814.m_margin = new pc.Vec4( i815[80], i815[81], i815[82], i815[83] )
  i814.m_isUsingLegacyAnimationComponent = !!i815[84]
  i814.m_isVolumetricText = !!i815[85]
  request.r(i815[86], i815[87], 0, i814, 'm_Material')
  i814.m_EmojiFallbackSupport = !!i815[88]
  i814.m_Maskable = !!i815[89]
  i814.m_Color = new pc.Color(i815[90], i815[91], i815[92], i815[93])
  i814.m_RaycastTarget = !!i815[94]
  i814.m_RaycastPadding = new pc.Vec4( i815[95], i815[96], i815[97], i815[98] )
  return i814
}

Deserializers["TMPro.VertexGradient"] = function (request, data, root) {
  var i822 = root || request.c( 'TMPro.VertexGradient' )
  var i823 = data
  i822.topLeft = new pc.Color(i823[0], i823[1], i823[2], i823[3])
  i822.topRight = new pc.Color(i823[4], i823[5], i823[6], i823[7])
  i822.bottomLeft = new pc.Color(i823[8], i823[9], i823[10], i823[11])
  i822.bottomRight = new pc.Color(i823[12], i823[13], i823[14], i823[15])
  return i822
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider"] = function (request, data, root) {
  var i826 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider' )
  var i827 = data
  i826.center = new pc.Vec3( i827[0], i827[1], i827[2] )
  i826.radius = i827[3]
  i826.height = i827[4]
  i826.direction = i827[5]
  i826.enabled = !!i827[6]
  i826.isTrigger = !!i827[7]
  request.r(i827[8], i827[9], 0, i826, 'material')
  return i826
}

Deserializers["BalloonController"] = function (request, data, root) {
  var i828 = root || request.c( 'BalloonController' )
  var i829 = data
  request.r(i829[0], i829[1], 0, i828, 'targetItem')
  i828.interactableLayer = UnityEngine.LayerMask.FromIntegerValue( i829[2] )
  i828.flyDuration = i829[3]
  i828.scaleDuration = i829[4]
  i828.delayBeforeNextSlot = i829[5]
  i828.onBalloonClicked = request.d('UnityEngine.Events.UnityEvent', i829[6], i828.onBalloonClicked)
  return i828
}

Deserializers["UnityEngine.Events.UnityEvent"] = function (request, data, root) {
  var i830 = root || request.c( 'UnityEngine.Events.UnityEvent' )
  var i831 = data
  i830.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i831[0], i830.m_PersistentCalls)
  return i830
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i832 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i833 = data
  var i835 = i833[0]
  var i834 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i835.length; i += 1) {
    i834.add(request.d('UnityEngine.Events.PersistentCall', i835[i + 0]));
  }
  i832.m_Calls = i834
  return i832
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i838 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i839 = data
  request.r(i839[0], i839[1], 0, i838, 'm_Target')
  i838.m_TargetAssemblyTypeName = i839[2]
  i838.m_MethodName = i839[3]
  i838.m_Mode = i839[4]
  i838.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i839[5], i838.m_Arguments)
  i838.m_CallState = i839[6]
  return i838
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i840 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i841 = data
  request.r(i841[0], i841[1], 0, i840, 'm_ObjectArgument')
  i840.m_ObjectArgumentAssemblyTypeName = i841[2]
  i840.m_IntArgument = i841[3]
  i840.m_FloatArgument = i841[4]
  i840.m_StringArgument = i841[5]
  i840.m_BoolArgument = !!i841[6]
  return i840
}

Deserializers["BalloonActionTrigger"] = function (request, data, root) {
  var i842 = root || request.c( 'BalloonActionTrigger' )
  var i843 = data
  request.r(i843[0], i843[1], 0, i842, 'targetCharacter')
  i842.animationTrack = i843[2]
  i842.animationName = i843[3]
  i842.clearOtherAnimations = !!i843[4]
  request.r(i843[5], i843[6], 0, i842, 'skeletonDataAsset')
  return i842
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i844 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i845 = data
  request.r(i845[0], i845[1], 0, i844, 'sharedMesh')
  return i844
}

Deserializers["Spine.Unity.SkeletonAnimation"] = function (request, data, root) {
  var i846 = root || request.c( 'Spine.Unity.SkeletonAnimation' )
  var i847 = data
  i846.loop = !!i847[0]
  i846.timeScale = i847[1]
  request.r(i847[2], i847[3], 0, i846, 'skeletonDataAsset')
  i846.initialSkinName = i847[4]
  i846.fixPrefabOverrideViaMeshFilter = i847[5]
  i846.initialFlipX = !!i847[6]
  i846.initialFlipY = !!i847[7]
  i846.updateWhenInvisible = i847[8]
  i846.zSpacing = i847[9]
  i846.useClipping = !!i847[10]
  i846.immutableTriangles = !!i847[11]
  i846.pmaVertexColors = !!i847[12]
  i846.clearStateOnDisable = !!i847[13]
  i846.tintBlack = !!i847[14]
  i846.singleSubmesh = !!i847[15]
  i846.fixDrawOrder = !!i847[16]
  i846.addNormals = !!i847[17]
  i846.calculateTangents = !!i847[18]
  i846.maskInteraction = i847[19]
  i846.maskMaterials = request.d('Spine.Unity.SkeletonRenderer+SpriteMaskInteractionMaterials', i847[20], i846.maskMaterials)
  i846.disableRenderingOnOverride = !!i847[21]
  i846.updateTiming = i847[22]
  i846.unscaledTime = !!i847[23]
  i846._animationName = i847[24]
  var i849 = i847[25]
  var i848 = []
  for(var i = 0; i < i849.length; i += 1) {
    i848.push( i849[i + 0] );
  }
  i846.separatorSlotNames = i848
  i846.physicsPositionInheritanceFactor = new pc.Vec2( i847[26], i847[27] )
  i846.physicsRotationInheritanceFactor = i847[28]
  request.r(i847[29], i847[30], 0, i846, 'physicsMovementRelativeTo')
  return i846
}

Deserializers["Spine.Unity.SkeletonRenderer+SpriteMaskInteractionMaterials"] = function (request, data, root) {
  var i850 = root || request.c( 'Spine.Unity.SkeletonRenderer+SpriteMaskInteractionMaterials' )
  var i851 = data
  var i853 = i851[0]
  var i852 = []
  for(var i = 0; i < i853.length; i += 2) {
  request.r(i853[i + 0], i853[i + 1], 2, i852, '')
  }
  i850.materialsMaskDisabled = i852
  var i855 = i851[1]
  var i854 = []
  for(var i = 0; i < i855.length; i += 2) {
  request.r(i855[i + 0], i855[i + 1], 2, i854, '')
  }
  i850.materialsInsideMask = i854
  var i857 = i851[2]
  var i856 = []
  for(var i = 0; i < i857.length; i += 2) {
  request.r(i857[i + 0], i857[i + 1], 2, i856, '')
  }
  i850.materialsOutsideMask = i856
  return i850
}

Deserializers["Character"] = function (request, data, root) {
  var i860 = root || request.c( 'Character' )
  var i861 = data
  var i863 = i861[0]
  var i862 = new (System.Collections.Generic.List$1(Bridge.ns('System.String')))
  for(var i = 0; i < i863.length; i += 1) {
    i862.add(i863[i + 0]);
  }
  i860.currentAppliedSkinNames = i862
  request.r(i861[1], i861[2], 0, i860, 'tf')
  request.r(i861[3], i861[4], 0, i860, 'skeletonAnimation')
  var i865 = i861[5]
  var i864 = new (System.Collections.Generic.List$1(Bridge.ns('SlotAttachmentPair')))
  for(var i = 0; i < i865.length; i += 1) {
    i864.add(request.d('SlotAttachmentPair', i865[i + 0]));
  }
  i860.currentAppliedPairs = i864
  return i860
}

Deserializers["SlotAttachmentPair"] = function (request, data, root) {
  var i870 = root || request.c( 'SlotAttachmentPair' )
  var i871 = data
  i870.isEnabled = !!i871[0]
  i870.slotName = i871[1]
  i870.attachmentName = i871[2]
  request.r(i871[3], i871[4], 0, i870, 'skeletonDataAsset')
  return i870
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i872 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i873 = data
  request.r(i873[0], i873[1], 0, i872, 'm_FirstSelected')
  i872.m_sendNavigationEvents = !!i873[2]
  i872.m_DragThreshold = i873[3]
  return i872
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i874 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i875 = data
  i874.m_HorizontalAxis = i875[0]
  i874.m_VerticalAxis = i875[1]
  i874.m_SubmitButton = i875[2]
  i874.m_CancelButton = i875[3]
  i874.m_InputActionsPerSecond = i875[4]
  i874.m_RepeatDelay = i875[5]
  i874.m_ForceModuleActive = !!i875[6]
  i874.m_SendPointerHoverToParent = !!i875[7]
  return i874
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i876 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i877 = data
  i876.ambientIntensity = i877[0]
  i876.reflectionIntensity = i877[1]
  i876.ambientMode = i877[2]
  i876.ambientLight = new pc.Color(i877[3], i877[4], i877[5], i877[6])
  i876.ambientSkyColor = new pc.Color(i877[7], i877[8], i877[9], i877[10])
  i876.ambientGroundColor = new pc.Color(i877[11], i877[12], i877[13], i877[14])
  i876.ambientEquatorColor = new pc.Color(i877[15], i877[16], i877[17], i877[18])
  i876.fogColor = new pc.Color(i877[19], i877[20], i877[21], i877[22])
  i876.fogEndDistance = i877[23]
  i876.fogStartDistance = i877[24]
  i876.fogDensity = i877[25]
  i876.fog = !!i877[26]
  request.r(i877[27], i877[28], 0, i876, 'skybox')
  i876.fogMode = i877[29]
  var i879 = i877[30]
  var i878 = []
  for(var i = 0; i < i879.length; i += 1) {
    i878.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i879[i + 0]) );
  }
  i876.lightmaps = i878
  i876.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i877[31], i876.lightProbes)
  i876.lightmapsMode = i877[32]
  i876.mixedBakeMode = i877[33]
  i876.environmentLightingMode = i877[34]
  i876.ambientProbe = new pc.SphericalHarmonicsL2(i877[35])
  i876.referenceAmbientProbe = new pc.SphericalHarmonicsL2(i877[36])
  i876.useReferenceAmbientProbe = !!i877[37]
  request.r(i877[38], i877[39], 0, i876, 'customReflection')
  request.r(i877[40], i877[41], 0, i876, 'defaultReflection')
  i876.defaultReflectionMode = i877[42]
  i876.defaultReflectionResolution = i877[43]
  i876.sunLightObjectId = i877[44]
  i876.pixelLightCount = i877[45]
  i876.defaultReflectionHDR = !!i877[46]
  i876.hasLightDataAsset = !!i877[47]
  i876.hasManualGenerate = !!i877[48]
  return i876
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i882 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i883 = data
  request.r(i883[0], i883[1], 0, i882, 'lightmapColor')
  request.r(i883[2], i883[3], 0, i882, 'lightmapDirection')
  request.r(i883[4], i883[5], 0, i882, 'shadowMask')
  return i882
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i884 = root || new UnityEngine.LightProbes()
  var i885 = data
  return i884
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i892 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i893 = data
  var i895 = i893[0]
  var i894 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i895.length; i += 1) {
    i894.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i895[i + 0]));
  }
  i892.ShaderCompilationErrors = i894
  i892.name = i893[1]
  i892.guid = i893[2]
  var i897 = i893[3]
  var i896 = []
  for(var i = 0; i < i897.length; i += 1) {
    i896.push( i897[i + 0] );
  }
  i892.shaderDefinedKeywords = i896
  var i899 = i893[4]
  var i898 = []
  for(var i = 0; i < i899.length; i += 1) {
    i898.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i899[i + 0]) );
  }
  i892.passes = i898
  var i901 = i893[5]
  var i900 = []
  for(var i = 0; i < i901.length; i += 1) {
    i900.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i901[i + 0]) );
  }
  i892.usePasses = i900
  var i903 = i893[6]
  var i902 = []
  for(var i = 0; i < i903.length; i += 1) {
    i902.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i903[i + 0]) );
  }
  i892.defaultParameterValues = i902
  request.r(i893[7], i893[8], 0, i892, 'unityFallbackShader')
  i892.readDepth = !!i893[9]
  i892.hasDepthOnlyPass = !!i893[10]
  i892.isCreatedByShaderGraph = !!i893[11]
  i892.disableBatching = !!i893[12]
  i892.compiled = !!i893[13]
  return i892
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i906 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i907 = data
  i906.shaderName = i907[0]
  i906.errorMessage = i907[1]
  return i906
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i910 = root || new pc.UnityShaderPass()
  var i911 = data
  i910.id = i911[0]
  i910.subShaderIndex = i911[1]
  i910.name = i911[2]
  i910.passType = i911[3]
  i910.grabPassTextureName = i911[4]
  i910.usePass = !!i911[5]
  i910.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i911[6], i910.zTest)
  i910.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i911[7], i910.zWrite)
  i910.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i911[8], i910.culling)
  i910.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i911[9], i910.blending)
  i910.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i911[10], i910.alphaBlending)
  i910.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i911[11], i910.colorWriteMask)
  i910.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i911[12], i910.offsetUnits)
  i910.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i911[13], i910.offsetFactor)
  i910.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i911[14], i910.stencilRef)
  i910.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i911[15], i910.stencilReadMask)
  i910.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i911[16], i910.stencilWriteMask)
  i910.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i911[17], i910.stencilOp)
  i910.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i911[18], i910.stencilOpFront)
  i910.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i911[19], i910.stencilOpBack)
  var i913 = i911[20]
  var i912 = []
  for(var i = 0; i < i913.length; i += 1) {
    i912.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i913[i + 0]) );
  }
  i910.tags = i912
  var i915 = i911[21]
  var i914 = []
  for(var i = 0; i < i915.length; i += 1) {
    i914.push( i915[i + 0] );
  }
  i910.passDefinedKeywords = i914
  var i917 = i911[22]
  var i916 = []
  for(var i = 0; i < i917.length; i += 1) {
    i916.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i917[i + 0]) );
  }
  i910.passDefinedKeywordGroups = i916
  var i919 = i911[23]
  var i918 = []
  for(var i = 0; i < i919.length; i += 1) {
    i918.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i919[i + 0]) );
  }
  i910.variants = i918
  var i921 = i911[24]
  var i920 = []
  for(var i = 0; i < i921.length; i += 1) {
    i920.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i921[i + 0]) );
  }
  i910.excludedVariants = i920
  i910.hasDepthReader = !!i911[25]
  return i910
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i922 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i923 = data
  i922.val = i923[0]
  i922.name = i923[1]
  return i922
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i924 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i925 = data
  i924.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i925[0], i924.src)
  i924.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i925[1], i924.dst)
  i924.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i925[2], i924.op)
  return i924
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i926 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i927 = data
  i926.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i927[0], i926.pass)
  i926.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i927[1], i926.fail)
  i926.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i927[2], i926.zFail)
  i926.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i927[3], i926.comp)
  return i926
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i930 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i931 = data
  i930.name = i931[0]
  i930.value = i931[1]
  return i930
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i934 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i935 = data
  var i937 = i935[0]
  var i936 = []
  for(var i = 0; i < i937.length; i += 1) {
    i936.push( i937[i + 0] );
  }
  i934.keywords = i936
  i934.hasDiscard = !!i935[1]
  return i934
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i940 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i941 = data
  i940.passId = i941[0]
  i940.subShaderIndex = i941[1]
  var i943 = i941[2]
  var i942 = []
  for(var i = 0; i < i943.length; i += 1) {
    i942.push( i943[i + 0] );
  }
  i940.keywords = i942
  i940.vertexProgram = i941[3]
  i940.fragmentProgram = i941[4]
  i940.exportedForWebGl2 = !!i941[5]
  i940.readDepth = !!i941[6]
  return i940
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i946 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i947 = data
  request.r(i947[0], i947[1], 0, i946, 'shader')
  i946.pass = i947[2]
  return i946
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i950 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i951 = data
  i950.name = i951[0]
  i950.type = i951[1]
  i950.value = new pc.Vec4( i951[2], i951[3], i951[4], i951[5] )
  i950.textureValue = i951[6]
  i950.shaderPropertyFlag = i951[7]
  return i950
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i952 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i953 = data
  i952.name = i953[0]
  request.r(i953[1], i953[2], 0, i952, 'texture')
  i952.aabb = i953[3]
  i952.vertices = i953[4]
  i952.triangles = i953[5]
  i952.textureRect = UnityEngine.Rect.MinMaxRect(i953[6], i953[7], i953[8], i953[9])
  i952.packedRect = UnityEngine.Rect.MinMaxRect(i953[10], i953[11], i953[12], i953[13])
  i952.border = new pc.Vec4( i953[14], i953[15], i953[16], i953[17] )
  i952.transparency = i953[18]
  i952.bounds = i953[19]
  i952.pixelsPerUnit = i953[20]
  i952.textureWidth = i953[21]
  i952.textureHeight = i953[22]
  i952.nativeSize = new pc.Vec2( i953[23], i953[24] )
  i952.pivot = new pc.Vec2( i953[25], i953[26] )
  i952.textureRectOffset = new pc.Vec2( i953[27], i953[28] )
  return i952
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i954 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i955 = data
  i954.name = i955[0]
  return i954
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip"] = function (request, data, root) {
  var i956 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip' )
  var i957 = data
  i956.name = i957[0]
  i956.wrapMode = i957[1]
  i956.isLooping = !!i957[2]
  i956.length = i957[3]
  var i959 = i957[4]
  var i958 = []
  for(var i = 0; i < i959.length; i += 1) {
    i958.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve', i959[i + 0]) );
  }
  i956.curves = i958
  var i961 = i957[5]
  var i960 = []
  for(var i = 0; i < i961.length; i += 1) {
    i960.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent', i961[i + 0]) );
  }
  i956.events = i960
  i956.halfPrecision = !!i957[6]
  i956._frameRate = i957[7]
  i956.localBounds = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds', i957[8], i956.localBounds)
  i956.hasMuscleCurves = !!i957[9]
  var i963 = i957[10]
  var i962 = []
  for(var i = 0; i < i963.length; i += 1) {
    i962.push( i963[i + 0] );
  }
  i956.clipMuscleConstant = i962
  i956.clipBindingConstant = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant', i957[11], i956.clipBindingConstant)
  return i956
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve"] = function (request, data, root) {
  var i966 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve' )
  var i967 = data
  i966.path = i967[0]
  i966.hash = i967[1]
  i966.componentType = i967[2]
  i966.property = i967[3]
  i966.keys = i967[4]
  var i969 = i967[5]
  var i968 = []
  for(var i = 0; i < i969.length; i += 1) {
    i968.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey', i969[i + 0]) );
  }
  i966.objectReferenceKeys = i968
  return i966
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey"] = function (request, data, root) {
  var i972 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey' )
  var i973 = data
  i972.time = i973[0]
  request.r(i973[1], i973[2], 0, i972, 'value')
  return i972
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent"] = function (request, data, root) {
  var i976 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent' )
  var i977 = data
  i976.functionName = i977[0]
  i976.floatParameter = i977[1]
  i976.intParameter = i977[2]
  i976.stringParameter = i977[3]
  request.r(i977[4], i977[5], 0, i976, 'objectReferenceParameter')
  i976.time = i977[6]
  return i976
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds"] = function (request, data, root) {
  var i978 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds' )
  var i979 = data
  i978.center = new pc.Vec3( i979[0], i979[1], i979[2] )
  i978.extends = new pc.Vec3( i979[3], i979[4], i979[5] )
  return i978
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant"] = function (request, data, root) {
  var i982 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant' )
  var i983 = data
  var i985 = i983[0]
  var i984 = []
  for(var i = 0; i < i985.length; i += 1) {
    i984.push( i985[i + 0] );
  }
  i982.genericBindings = i984
  var i987 = i983[1]
  var i986 = []
  for(var i = 0; i < i987.length; i += 1) {
    i986.push( i987[i + 0] );
  }
  i982.pptrCurveMapping = i986
  return i982
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i988 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i989 = data
  i988.name = i989[0]
  i988.ascent = i989[1]
  i988.originalLineHeight = i989[2]
  i988.fontSize = i989[3]
  var i991 = i989[4]
  var i990 = []
  for(var i = 0; i < i991.length; i += 1) {
    i990.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i991[i + 0]) );
  }
  i988.characterInfo = i990
  request.r(i989[5], i989[6], 0, i988, 'texture')
  i988.originalFontSize = i989[7]
  return i988
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i994 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i995 = data
  i994.index = i995[0]
  i994.advance = i995[1]
  i994.bearing = i995[2]
  i994.glyphWidth = i995[3]
  i994.glyphHeight = i995[4]
  i994.minX = i995[5]
  i994.maxX = i995[6]
  i994.minY = i995[7]
  i994.maxY = i995[8]
  i994.uvBottomLeftX = i995[9]
  i994.uvBottomLeftY = i995[10]
  i994.uvBottomRightX = i995[11]
  i994.uvBottomRightY = i995[12]
  i994.uvTopLeftX = i995[13]
  i994.uvTopLeftY = i995[14]
  i994.uvTopRightX = i995[15]
  i994.uvTopRightY = i995[16]
  return i994
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController"] = function (request, data, root) {
  var i996 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController' )
  var i997 = data
  i996.name = i997[0]
  var i999 = i997[1]
  var i998 = []
  for(var i = 0; i < i999.length; i += 1) {
    i998.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer', i999[i + 0]) );
  }
  i996.layers = i998
  var i1001 = i997[2]
  var i1000 = []
  for(var i = 0; i < i1001.length; i += 1) {
    i1000.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter', i1001[i + 0]) );
  }
  i996.parameters = i1000
  i996.animationClips = i997[3]
  i996.avatarUnsupported = i997[4]
  return i996
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer"] = function (request, data, root) {
  var i1004 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer' )
  var i1005 = data
  i1004.name = i1005[0]
  i1004.defaultWeight = i1005[1]
  i1004.blendingMode = i1005[2]
  i1004.avatarMask = i1005[3]
  i1004.syncedLayerIndex = i1005[4]
  i1004.syncedLayerAffectsTiming = !!i1005[5]
  i1004.syncedLayers = i1005[6]
  i1004.stateMachine = request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i1005[7], i1004.stateMachine)
  return i1004
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine"] = function (request, data, root) {
  var i1006 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine' )
  var i1007 = data
  i1006.id = i1007[0]
  i1006.name = i1007[1]
  i1006.path = i1007[2]
  var i1009 = i1007[3]
  var i1008 = []
  for(var i = 0; i < i1009.length; i += 1) {
    i1008.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState', i1009[i + 0]) );
  }
  i1006.states = i1008
  var i1011 = i1007[4]
  var i1010 = []
  for(var i = 0; i < i1011.length; i += 1) {
    i1010.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i1011[i + 0]) );
  }
  i1006.machines = i1010
  var i1013 = i1007[5]
  var i1012 = []
  for(var i = 0; i < i1013.length; i += 1) {
    i1012.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i1013[i + 0]) );
  }
  i1006.entryStateTransitions = i1012
  var i1015 = i1007[6]
  var i1014 = []
  for(var i = 0; i < i1015.length; i += 1) {
    i1014.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i1015[i + 0]) );
  }
  i1006.exitStateTransitions = i1014
  var i1017 = i1007[7]
  var i1016 = []
  for(var i = 0; i < i1017.length; i += 1) {
    i1016.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i1017[i + 0]) );
  }
  i1006.anyStateTransitions = i1016
  i1006.defaultStateId = i1007[8]
  return i1006
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState"] = function (request, data, root) {
  var i1020 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState' )
  var i1021 = data
  i1020.id = i1021[0]
  i1020.name = i1021[1]
  i1020.cycleOffset = i1021[2]
  i1020.cycleOffsetParameter = i1021[3]
  i1020.cycleOffsetParameterActive = !!i1021[4]
  i1020.mirror = !!i1021[5]
  i1020.mirrorParameter = i1021[6]
  i1020.mirrorParameterActive = !!i1021[7]
  i1020.motionId = i1021[8]
  i1020.nameHash = i1021[9]
  i1020.fullPathHash = i1021[10]
  i1020.speed = i1021[11]
  i1020.speedParameter = i1021[12]
  i1020.speedParameterActive = !!i1021[13]
  i1020.tag = i1021[14]
  i1020.tagHash = i1021[15]
  i1020.writeDefaultValues = !!i1021[16]
  var i1023 = i1021[17]
  var i1022 = []
  for(var i = 0; i < i1023.length; i += 2) {
  request.r(i1023[i + 0], i1023[i + 1], 2, i1022, '')
  }
  i1020.behaviours = i1022
  var i1025 = i1021[18]
  var i1024 = []
  for(var i = 0; i < i1025.length; i += 1) {
    i1024.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i1025[i + 0]) );
  }
  i1020.transitions = i1024
  return i1020
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition"] = function (request, data, root) {
  var i1030 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition' )
  var i1031 = data
  i1030.fullPath = i1031[0]
  i1030.canTransitionToSelf = !!i1031[1]
  i1030.duration = i1031[2]
  i1030.exitTime = i1031[3]
  i1030.hasExitTime = !!i1031[4]
  i1030.hasFixedDuration = !!i1031[5]
  i1030.interruptionSource = i1031[6]
  i1030.offset = i1031[7]
  i1030.orderedInterruption = !!i1031[8]
  i1030.destinationStateId = i1031[9]
  i1030.isExit = !!i1031[10]
  i1030.mute = !!i1031[11]
  i1030.solo = !!i1031[12]
  var i1033 = i1031[13]
  var i1032 = []
  for(var i = 0; i < i1033.length; i += 1) {
    i1032.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i1033[i + 0]) );
  }
  i1030.conditions = i1032
  return i1030
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition"] = function (request, data, root) {
  var i1038 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition' )
  var i1039 = data
  i1038.destinationStateId = i1039[0]
  i1038.isExit = !!i1039[1]
  i1038.mute = !!i1039[2]
  i1038.solo = !!i1039[3]
  var i1041 = i1039[4]
  var i1040 = []
  for(var i = 0; i < i1041.length; i += 1) {
    i1040.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i1041[i + 0]) );
  }
  i1038.conditions = i1040
  return i1038
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter"] = function (request, data, root) {
  var i1044 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter' )
  var i1045 = data
  i1044.defaultBool = !!i1045[0]
  i1044.defaultFloat = i1045[1]
  i1044.defaultInt = i1045[2]
  i1044.name = i1045[3]
  i1044.nameHash = i1045[4]
  i1044.type = i1045[5]
  return i1044
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i1046 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i1047 = data
  i1046.name = i1047[0]
  i1046.bytes64 = i1047[1]
  i1046.data = i1047[2]
  return i1046
}

Deserializers["SlotDataSO"] = function (request, data, root) {
  var i1048 = root || request.c( 'SlotDataSO' )
  var i1049 = data
  i1048.slotName = i1049[0]
  request.r(i1049[1], i1049[2], 0, i1048, 'leftItemSprite')
  request.r(i1049[3], i1049[4], 0, i1048, 'rightItemSprite')
  return i1048
}

Deserializers["Spine.Unity.SkeletonDataAsset"] = function (request, data, root) {
  var i1050 = root || request.c( 'Spine.Unity.SkeletonDataAsset' )
  var i1051 = data
  var i1053 = i1051[0]
  var i1052 = []
  for(var i = 0; i < i1053.length; i += 2) {
  request.r(i1053[i + 0], i1053[i + 1], 2, i1052, '')
  }
  i1050.atlasAssets = i1052
  i1050.scale = i1051[1]
  request.r(i1051[2], i1051[3], 0, i1050, 'skeletonJSON')
  i1050.isUpgradingBlendModeMaterials = !!i1051[4]
  i1050.blendModeMaterials = request.d('Spine.Unity.BlendModeMaterials', i1051[5], i1050.blendModeMaterials)
  var i1055 = i1051[6]
  var i1054 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.SkeletonDataModifierAsset')))
  for(var i = 0; i < i1055.length; i += 2) {
  request.r(i1055[i + 0], i1055[i + 1], 1, i1054, '')
  }
  i1050.skeletonDataModifiers = i1054
  var i1057 = i1051[7]
  var i1056 = []
  for(var i = 0; i < i1057.length; i += 1) {
    i1056.push( i1057[i + 0] );
  }
  i1050.fromAnimation = i1056
  var i1059 = i1051[8]
  var i1058 = []
  for(var i = 0; i < i1059.length; i += 1) {
    i1058.push( i1059[i + 0] );
  }
  i1050.toAnimation = i1058
  i1050.duration = i1051[9]
  i1050.defaultMix = i1051[10]
  request.r(i1051[11], i1051[12], 0, i1050, 'controller')
  return i1050
}

Deserializers["Spine.Unity.BlendModeMaterials"] = function (request, data, root) {
  var i1062 = root || request.c( 'Spine.Unity.BlendModeMaterials' )
  var i1063 = data
  i1062.applyAdditiveMaterial = !!i1063[0]
  var i1065 = i1063[1]
  var i1064 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.BlendModeMaterials+ReplacementMaterial')))
  for(var i = 0; i < i1065.length; i += 1) {
    i1064.add(request.d('Spine.Unity.BlendModeMaterials+ReplacementMaterial', i1065[i + 0]));
  }
  i1062.additiveMaterials = i1064
  var i1067 = i1063[2]
  var i1066 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.BlendModeMaterials+ReplacementMaterial')))
  for(var i = 0; i < i1067.length; i += 1) {
    i1066.add(request.d('Spine.Unity.BlendModeMaterials+ReplacementMaterial', i1067[i + 0]));
  }
  i1062.multiplyMaterials = i1066
  var i1069 = i1063[3]
  var i1068 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.BlendModeMaterials+ReplacementMaterial')))
  for(var i = 0; i < i1069.length; i += 1) {
    i1068.add(request.d('Spine.Unity.BlendModeMaterials+ReplacementMaterial', i1069[i + 0]));
  }
  i1062.screenMaterials = i1068
  i1062.requiresBlendModeMaterials = !!i1063[4]
  return i1062
}

Deserializers["Spine.Unity.BlendModeMaterials+ReplacementMaterial"] = function (request, data, root) {
  var i1072 = root || request.c( 'Spine.Unity.BlendModeMaterials+ReplacementMaterial' )
  var i1073 = data
  i1072.pageName = i1073[0]
  request.r(i1073[1], i1073[2], 0, i1072, 'material')
  return i1072
}

Deserializers["Spine.Unity.SpineAtlasAsset"] = function (request, data, root) {
  var i1076 = root || request.c( 'Spine.Unity.SpineAtlasAsset' )
  var i1077 = data
  request.r(i1077[0], i1077[1], 0, i1076, 'atlasFile')
  var i1079 = i1077[2]
  var i1078 = []
  for(var i = 0; i < i1079.length; i += 2) {
  request.r(i1079[i + 0], i1079[i + 1], 2, i1078, '')
  }
  i1076.materials = i1078
  i1076.textureLoadingMode = i1077[3]
  request.r(i1077[4], i1077[5], 0, i1076, 'onDemandTextureLoader')
  return i1076
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i1080 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i1081 = data
  i1080.normalStyle = i1081[0]
  i1080.normalSpacingOffset = i1081[1]
  i1080.boldStyle = i1081[2]
  i1080.boldSpacing = i1081[3]
  i1080.italicStyle = i1081[4]
  i1080.tabSize = i1081[5]
  request.r(i1081[6], i1081[7], 0, i1080, 'atlas')
  i1080.m_SourceFontFileGUID = i1081[8]
  i1080.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i1081[9], i1080.m_CreationSettings)
  request.r(i1081[10], i1081[11], 0, i1080, 'm_SourceFontFile')
  i1080.m_SourceFontFilePath = i1081[12]
  i1080.m_AtlasPopulationMode = i1081[13]
  i1080.InternalDynamicOS = !!i1081[14]
  var i1083 = i1081[15]
  var i1082 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i1083.length; i += 1) {
    i1082.add(request.d('UnityEngine.TextCore.Glyph', i1083[i + 0]));
  }
  i1080.m_GlyphTable = i1082
  var i1085 = i1081[16]
  var i1084 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i1085.length; i += 1) {
    i1084.add(request.d('TMPro.TMP_Character', i1085[i + 0]));
  }
  i1080.m_CharacterTable = i1084
  var i1087 = i1081[17]
  var i1086 = []
  for(var i = 0; i < i1087.length; i += 2) {
  request.r(i1087[i + 0], i1087[i + 1], 2, i1086, '')
  }
  i1080.m_AtlasTextures = i1086
  i1080.m_AtlasTextureIndex = i1081[18]
  i1080.m_IsMultiAtlasTexturesEnabled = !!i1081[19]
  i1080.m_GetFontFeatures = !!i1081[20]
  i1080.m_ClearDynamicDataOnBuild = !!i1081[21]
  i1080.m_AtlasWidth = i1081[22]
  i1080.m_AtlasHeight = i1081[23]
  i1080.m_AtlasPadding = i1081[24]
  i1080.m_AtlasRenderMode = i1081[25]
  var i1089 = i1081[26]
  var i1088 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i1089.length; i += 1) {
    i1088.add(request.d('UnityEngine.TextCore.GlyphRect', i1089[i + 0]));
  }
  i1080.m_UsedGlyphRects = i1088
  var i1091 = i1081[27]
  var i1090 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i1091.length; i += 1) {
    i1090.add(request.d('UnityEngine.TextCore.GlyphRect', i1091[i + 0]));
  }
  i1080.m_FreeGlyphRects = i1090
  i1080.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i1081[28], i1080.m_FontFeatureTable)
  i1080.m_ShouldReimportFontFeatures = !!i1081[29]
  var i1093 = i1081[30]
  var i1092 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1093.length; i += 2) {
  request.r(i1093[i + 0], i1093[i + 1], 1, i1092, '')
  }
  i1080.m_FallbackFontAssetTable = i1092
  var i1095 = i1081[31]
  var i1094 = []
  for(var i = 0; i < i1095.length; i += 1) {
    i1094.push( request.d('TMPro.TMP_FontWeightPair', i1095[i + 0]) );
  }
  i1080.m_FontWeightTable = i1094
  var i1097 = i1081[32]
  var i1096 = []
  for(var i = 0; i < i1097.length; i += 1) {
    i1096.push( request.d('TMPro.TMP_FontWeightPair', i1097[i + 0]) );
  }
  i1080.fontWeights = i1096
  i1080.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i1081[33], i1080.m_fontInfo)
  var i1099 = i1081[34]
  var i1098 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i1099.length; i += 1) {
    i1098.add(request.d('TMPro.TMP_Glyph', i1099[i + 0]));
  }
  i1080.m_glyphInfoList = i1098
  i1080.m_KerningTable = request.d('TMPro.KerningTable', i1081[35], i1080.m_KerningTable)
  var i1101 = i1081[36]
  var i1100 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1101.length; i += 2) {
  request.r(i1101[i + 0], i1101[i + 1], 1, i1100, '')
  }
  i1080.fallbackFontAssets = i1100
  i1080.m_Version = i1081[37]
  i1080.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i1081[38], i1080.m_FaceInfo)
  request.r(i1081[39], i1081[40], 0, i1080, 'm_Material')
  return i1080
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i1102 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i1103 = data
  i1102.sourceFontFileName = i1103[0]
  i1102.sourceFontFileGUID = i1103[1]
  i1102.faceIndex = i1103[2]
  i1102.pointSizeSamplingMode = i1103[3]
  i1102.pointSize = i1103[4]
  i1102.padding = i1103[5]
  i1102.paddingMode = i1103[6]
  i1102.packingMode = i1103[7]
  i1102.atlasWidth = i1103[8]
  i1102.atlasHeight = i1103[9]
  i1102.characterSetSelectionMode = i1103[10]
  i1102.characterSequence = i1103[11]
  i1102.referencedFontAssetGUID = i1103[12]
  i1102.referencedTextAssetGUID = i1103[13]
  i1102.fontStyle = i1103[14]
  i1102.fontStyleModifier = i1103[15]
  i1102.renderMode = i1103[16]
  i1102.includeFontFeatures = !!i1103[17]
  return i1102
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i1106 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i1107 = data
  i1106.m_Index = i1107[0]
  i1106.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i1107[1], i1106.m_Metrics)
  i1106.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i1107[2], i1106.m_GlyphRect)
  i1106.m_Scale = i1107[3]
  i1106.m_AtlasIndex = i1107[4]
  i1106.m_ClassDefinitionType = i1107[5]
  return i1106
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i1110 = root || request.c( 'TMPro.TMP_Character' )
  var i1111 = data
  i1110.m_ElementType = i1111[0]
  i1110.m_Unicode = i1111[1]
  i1110.m_GlyphIndex = i1111[2]
  i1110.m_Scale = i1111[3]
  return i1110
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i1116 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i1117 = data
  i1116.m_X = i1117[0]
  i1116.m_Y = i1117[1]
  i1116.m_Width = i1117[2]
  i1116.m_Height = i1117[3]
  return i1116
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i1118 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i1119 = data
  var i1121 = i1119[0]
  var i1120 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i1121.length; i += 1) {
    i1120.add(request.d('TMPro.MultipleSubstitutionRecord', i1121[i + 0]));
  }
  i1118.m_MultipleSubstitutionRecords = i1120
  var i1123 = i1119[1]
  var i1122 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i1123.length; i += 1) {
    i1122.add(request.d('TMPro.LigatureSubstitutionRecord', i1123[i + 0]));
  }
  i1118.m_LigatureSubstitutionRecords = i1122
  var i1125 = i1119[2]
  var i1124 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i1125.length; i += 1) {
    i1124.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i1125[i + 0]));
  }
  i1118.m_GlyphPairAdjustmentRecords = i1124
  var i1127 = i1119[3]
  var i1126 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i1127.length; i += 1) {
    i1126.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i1127[i + 0]));
  }
  i1118.m_MarkToBaseAdjustmentRecords = i1126
  var i1129 = i1119[4]
  var i1128 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i1129.length; i += 1) {
    i1128.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i1129[i + 0]));
  }
  i1118.m_MarkToMarkAdjustmentRecords = i1128
  return i1118
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i1132 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i1133 = data
  i1132.m_TargetGlyphID = i1133[0]
  i1132.m_SubstituteGlyphIDs = i1133[1]
  return i1132
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i1136 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i1137 = data
  i1136.m_ComponentGlyphIDs = i1137[0]
  i1136.m_LigatureGlyphID = i1137[1]
  return i1136
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i1140 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i1141 = data
  i1140.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i1141[0], i1140.m_FirstAdjustmentRecord)
  i1140.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i1141[1], i1140.m_SecondAdjustmentRecord)
  i1140.m_FeatureLookupFlags = i1141[2]
  return i1140
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i1142 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i1143 = data
  i1142.m_GlyphIndex = i1143[0]
  i1142.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i1143[1], i1142.m_GlyphValueRecord)
  return i1142
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i1144 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i1145 = data
  i1144.m_XPlacement = i1145[0]
  i1144.m_YPlacement = i1145[1]
  i1144.m_XAdvance = i1145[2]
  i1144.m_YAdvance = i1145[3]
  return i1144
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i1148 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i1149 = data
  i1148.m_BaseGlyphID = i1149[0]
  i1148.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i1149[1], i1148.m_BaseGlyphAnchorPoint)
  i1148.m_MarkGlyphID = i1149[2]
  i1148.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i1149[3], i1148.m_MarkPositionAdjustment)
  return i1148
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i1152 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i1153 = data
  i1152.m_BaseMarkGlyphID = i1153[0]
  i1152.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i1153[1], i1152.m_BaseMarkGlyphAnchorPoint)
  i1152.m_CombiningMarkGlyphID = i1153[2]
  i1152.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i1153[3], i1152.m_CombiningMarkPositionAdjustment)
  return i1152
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i1158 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i1159 = data
  request.r(i1159[0], i1159[1], 0, i1158, 'regularTypeface')
  request.r(i1159[2], i1159[3], 0, i1158, 'italicTypeface')
  return i1158
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i1160 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i1161 = data
  i1160.Name = i1161[0]
  i1160.PointSize = i1161[1]
  i1160.Scale = i1161[2]
  i1160.CharacterCount = i1161[3]
  i1160.LineHeight = i1161[4]
  i1160.Baseline = i1161[5]
  i1160.Ascender = i1161[6]
  i1160.CapHeight = i1161[7]
  i1160.Descender = i1161[8]
  i1160.CenterLine = i1161[9]
  i1160.SuperscriptOffset = i1161[10]
  i1160.SubscriptOffset = i1161[11]
  i1160.SubSize = i1161[12]
  i1160.Underline = i1161[13]
  i1160.UnderlineThickness = i1161[14]
  i1160.strikethrough = i1161[15]
  i1160.strikethroughThickness = i1161[16]
  i1160.TabWidth = i1161[17]
  i1160.Padding = i1161[18]
  i1160.AtlasWidth = i1161[19]
  i1160.AtlasHeight = i1161[20]
  return i1160
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i1164 = root || request.c( 'TMPro.TMP_Glyph' )
  var i1165 = data
  i1164.id = i1165[0]
  i1164.x = i1165[1]
  i1164.y = i1165[2]
  i1164.width = i1165[3]
  i1164.height = i1165[4]
  i1164.xOffset = i1165[5]
  i1164.yOffset = i1165[6]
  i1164.xAdvance = i1165[7]
  i1164.scale = i1165[8]
  return i1164
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i1166 = root || request.c( 'TMPro.KerningTable' )
  var i1167 = data
  var i1169 = i1167[0]
  var i1168 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i1169.length; i += 1) {
    i1168.add(request.d('TMPro.KerningPair', i1169[i + 0]));
  }
  i1166.kerningPairs = i1168
  return i1166
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i1172 = root || request.c( 'TMPro.KerningPair' )
  var i1173 = data
  i1172.xOffset = i1173[0]
  i1172.m_FirstGlyph = i1173[1]
  i1172.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i1173[2], i1172.m_FirstGlyphAdjustments)
  i1172.m_SecondGlyph = i1173[3]
  i1172.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i1173[4], i1172.m_SecondGlyphAdjustments)
  i1172.m_IgnoreSpacingAdjustments = !!i1173[5]
  return i1172
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i1174 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i1175 = data
  i1174.m_FaceIndex = i1175[0]
  i1174.m_FamilyName = i1175[1]
  i1174.m_StyleName = i1175[2]
  i1174.m_PointSize = i1175[3]
  i1174.m_Scale = i1175[4]
  i1174.m_UnitsPerEM = i1175[5]
  i1174.m_LineHeight = i1175[6]
  i1174.m_AscentLine = i1175[7]
  i1174.m_CapLine = i1175[8]
  i1174.m_MeanLine = i1175[9]
  i1174.m_Baseline = i1175[10]
  i1174.m_DescentLine = i1175[11]
  i1174.m_SuperscriptOffset = i1175[12]
  i1174.m_SuperscriptSize = i1175[13]
  i1174.m_SubscriptOffset = i1175[14]
  i1174.m_SubscriptSize = i1175[15]
  i1174.m_UnderlineOffset = i1175[16]
  i1174.m_UnderlineThickness = i1175[17]
  i1174.m_StrikethroughOffset = i1175[18]
  i1174.m_StrikethroughThickness = i1175[19]
  i1174.m_TabWidth = i1175[20]
  return i1174
}

Deserializers["EquipmentSetData"] = function (request, data, root) {
  var i1176 = root || request.c( 'EquipmentSetData' )
  var i1177 = data
  request.r(i1177[0], i1177[1], 0, i1176, 'targetSkeletonDataAsset')
  var i1179 = i1177[2]
  var i1178 = new (System.Collections.Generic.List$1(Bridge.ns('System.String')))
  for(var i = 0; i < i1179.length; i += 1) {
    i1178.add(i1179[i + 0]);
  }
  i1176.skinNames = i1178
  return i1176
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i1180 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i1181 = data
  i1180.useSafeMode = !!i1181[0]
  i1180.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i1181[1], i1180.safeModeOptions)
  i1180.timeScale = i1181[2]
  i1180.unscaledTimeScale = i1181[3]
  i1180.useSmoothDeltaTime = !!i1181[4]
  i1180.maxSmoothUnscaledTime = i1181[5]
  i1180.rewindCallbackMode = i1181[6]
  i1180.showUnityEditorReport = !!i1181[7]
  i1180.logBehaviour = i1181[8]
  i1180.drawGizmos = !!i1181[9]
  i1180.defaultRecyclable = !!i1181[10]
  i1180.defaultAutoPlay = i1181[11]
  i1180.defaultUpdateType = i1181[12]
  i1180.defaultTimeScaleIndependent = !!i1181[13]
  i1180.defaultEaseType = i1181[14]
  i1180.defaultEaseOvershootOrAmplitude = i1181[15]
  i1180.defaultEasePeriod = i1181[16]
  i1180.defaultAutoKill = !!i1181[17]
  i1180.defaultLoopType = i1181[18]
  i1180.debugMode = !!i1181[19]
  i1180.debugStoreTargetId = !!i1181[20]
  i1180.showPreviewPanel = !!i1181[21]
  i1180.storeSettingsLocation = i1181[22]
  i1180.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i1181[23], i1180.modules)
  i1180.createASMDEF = !!i1181[24]
  i1180.showPlayingTweens = !!i1181[25]
  i1180.showPausedTweens = !!i1181[26]
  return i1180
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i1182 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i1183 = data
  i1182.logBehaviour = i1183[0]
  i1182.nestedTweenFailureBehaviour = i1183[1]
  return i1182
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i1184 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i1185 = data
  i1184.showPanel = !!i1185[0]
  i1184.audioEnabled = !!i1185[1]
  i1184.physicsEnabled = !!i1185[2]
  i1184.physics2DEnabled = !!i1185[3]
  i1184.spriteEnabled = !!i1185[4]
  i1184.uiEnabled = !!i1185[5]
  i1184.uiToolkitEnabled = !!i1185[6]
  i1184.textMeshProEnabled = !!i1185[7]
  i1184.tk2DEnabled = !!i1185[8]
  i1184.deAudioEnabled = !!i1185[9]
  i1184.deUnityExtendedEnabled = !!i1185[10]
  i1184.epoOutlineEnabled = !!i1185[11]
  return i1184
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i1186 = root || request.c( 'TMPro.TMP_Settings' )
  var i1187 = data
  i1186.assetVersion = i1187[0]
  i1186.m_TextWrappingMode = i1187[1]
  i1186.m_enableKerning = !!i1187[2]
  var i1189 = i1187[3]
  var i1188 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i1189.length; i += 1) {
    i1188.add(i1189[i + 0]);
  }
  i1186.m_ActiveFontFeatures = i1188
  i1186.m_enableExtraPadding = !!i1187[4]
  i1186.m_enableTintAllSprites = !!i1187[5]
  i1186.m_enableParseEscapeCharacters = !!i1187[6]
  i1186.m_EnableRaycastTarget = !!i1187[7]
  i1186.m_GetFontFeaturesAtRuntime = !!i1187[8]
  i1186.m_missingGlyphCharacter = i1187[9]
  i1186.m_ClearDynamicDataOnBuild = !!i1187[10]
  i1186.m_warningsDisabled = !!i1187[11]
  request.r(i1187[12], i1187[13], 0, i1186, 'm_defaultFontAsset')
  i1186.m_defaultFontAssetPath = i1187[14]
  i1186.m_defaultFontSize = i1187[15]
  i1186.m_defaultAutoSizeMinRatio = i1187[16]
  i1186.m_defaultAutoSizeMaxRatio = i1187[17]
  i1186.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i1187[18], i1187[19] )
  i1186.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i1187[20], i1187[21] )
  i1186.m_autoSizeTextContainer = !!i1187[22]
  i1186.m_IsTextObjectScaleStatic = !!i1187[23]
  var i1191 = i1187[24]
  var i1190 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1191.length; i += 2) {
  request.r(i1191[i + 0], i1191[i + 1], 1, i1190, '')
  }
  i1186.m_fallbackFontAssets = i1190
  i1186.m_matchMaterialPreset = !!i1187[25]
  i1186.m_HideSubTextObjects = !!i1187[26]
  request.r(i1187[27], i1187[28], 0, i1186, 'm_defaultSpriteAsset')
  i1186.m_defaultSpriteAssetPath = i1187[29]
  i1186.m_enableEmojiSupport = !!i1187[30]
  i1186.m_MissingCharacterSpriteUnicode = i1187[31]
  var i1193 = i1187[32]
  var i1192 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i1193.length; i += 2) {
  request.r(i1193[i + 0], i1193[i + 1], 1, i1192, '')
  }
  i1186.m_EmojiFallbackTextAssets = i1192
  i1186.m_defaultColorGradientPresetsPath = i1187[33]
  request.r(i1187[34], i1187[35], 0, i1186, 'm_defaultStyleSheet')
  i1186.m_StyleSheetsResourcePath = i1187[36]
  request.r(i1187[37], i1187[38], 0, i1186, 'm_leadingCharacters')
  request.r(i1187[39], i1187[40], 0, i1186, 'm_followingCharacters')
  i1186.m_UseModernHangulLineBreakingRules = !!i1187[41]
  return i1186
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i1196 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i1197 = data
  request.r(i1197[0], i1197[1], 0, i1196, 'spriteSheet')
  var i1199 = i1197[2]
  var i1198 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i1199.length; i += 1) {
    i1198.add(request.d('TMPro.TMP_Sprite', i1199[i + 0]));
  }
  i1196.spriteInfoList = i1198
  var i1201 = i1197[3]
  var i1200 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i1201.length; i += 2) {
  request.r(i1201[i + 0], i1201[i + 1], 1, i1200, '')
  }
  i1196.fallbackSpriteAssets = i1200
  var i1203 = i1197[4]
  var i1202 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i1203.length; i += 1) {
    i1202.add(request.d('TMPro.TMP_SpriteCharacter', i1203[i + 0]));
  }
  i1196.m_SpriteCharacterTable = i1202
  var i1205 = i1197[5]
  var i1204 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i1205.length; i += 1) {
    i1204.add(request.d('TMPro.TMP_SpriteGlyph', i1205[i + 0]));
  }
  i1196.m_GlyphTable = i1204
  i1196.m_Version = i1197[6]
  i1196.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i1197[7], i1196.m_FaceInfo)
  request.r(i1197[8], i1197[9], 0, i1196, 'm_Material')
  return i1196
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i1208 = root || request.c( 'TMPro.TMP_Sprite' )
  var i1209 = data
  i1208.name = i1209[0]
  i1208.hashCode = i1209[1]
  i1208.unicode = i1209[2]
  i1208.pivot = new pc.Vec2( i1209[3], i1209[4] )
  request.r(i1209[5], i1209[6], 0, i1208, 'sprite')
  i1208.id = i1209[7]
  i1208.x = i1209[8]
  i1208.y = i1209[9]
  i1208.width = i1209[10]
  i1208.height = i1209[11]
  i1208.xOffset = i1209[12]
  i1208.yOffset = i1209[13]
  i1208.xAdvance = i1209[14]
  i1208.scale = i1209[15]
  return i1208
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i1214 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i1215 = data
  i1214.m_Name = i1215[0]
  i1214.m_ElementType = i1215[1]
  i1214.m_Unicode = i1215[2]
  i1214.m_GlyphIndex = i1215[3]
  i1214.m_Scale = i1215[4]
  return i1214
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i1218 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i1219 = data
  request.r(i1219[0], i1219[1], 0, i1218, 'sprite')
  i1218.m_Index = i1219[2]
  i1218.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i1219[3], i1218.m_Metrics)
  i1218.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i1219[4], i1218.m_GlyphRect)
  i1218.m_Scale = i1219[5]
  i1218.m_AtlasIndex = i1219[6]
  i1218.m_ClassDefinitionType = i1219[7]
  return i1218
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i1220 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i1221 = data
  i1220.m_Width = i1221[0]
  i1220.m_Height = i1221[1]
  i1220.m_HorizontalBearingX = i1221[2]
  i1220.m_HorizontalBearingY = i1221[3]
  i1220.m_HorizontalAdvance = i1221[4]
  return i1220
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i1222 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i1223 = data
  var i1225 = i1223[0]
  var i1224 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i1225.length; i += 1) {
    i1224.add(request.d('TMPro.TMP_Style', i1225[i + 0]));
  }
  i1222.m_StyleList = i1224
  return i1222
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i1228 = root || request.c( 'TMPro.TMP_Style' )
  var i1229 = data
  i1228.m_Name = i1229[0]
  i1228.m_HashCode = i1229[1]
  i1228.m_OpeningDefinition = i1229[2]
  i1228.m_ClosingDefinition = i1229[3]
  i1228.m_OpeningTagArray = i1229[4]
  i1228.m_ClosingTagArray = i1229[5]
  return i1228
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i1230 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i1231 = data
  var i1233 = i1231[0]
  var i1232 = []
  for(var i = 0; i < i1233.length; i += 1) {
    i1232.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i1233[i + 0]) );
  }
  i1230.files = i1232
  i1230.componentToPrefabIds = i1231[1]
  return i1230
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i1236 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i1237 = data
  i1236.path = i1237[0]
  request.r(i1237[1], i1237[2], 0, i1236, 'unityObject')
  return i1236
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i1238 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i1239 = data
  var i1241 = i1239[0]
  var i1240 = []
  for(var i = 0; i < i1241.length; i += 1) {
    i1240.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i1241[i + 0]) );
  }
  i1238.scriptsExecutionOrder = i1240
  var i1243 = i1239[1]
  var i1242 = []
  for(var i = 0; i < i1243.length; i += 1) {
    i1242.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i1243[i + 0]) );
  }
  i1238.sortingLayers = i1242
  var i1245 = i1239[2]
  var i1244 = []
  for(var i = 0; i < i1245.length; i += 1) {
    i1244.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i1245[i + 0]) );
  }
  i1238.cullingLayers = i1244
  i1238.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i1239[3], i1238.timeSettings)
  i1238.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i1239[4], i1238.physicsSettings)
  i1238.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i1239[5], i1238.physics2DSettings)
  i1238.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1239[6], i1238.qualitySettings)
  i1238.enableRealtimeShadows = !!i1239[7]
  i1238.enableAutoInstancing = !!i1239[8]
  i1238.enableStaticBatching = !!i1239[9]
  i1238.enableDynamicBatching = !!i1239[10]
  i1238.lightmapEncodingQuality = i1239[11]
  i1238.desiredColorSpace = i1239[12]
  var i1247 = i1239[13]
  var i1246 = []
  for(var i = 0; i < i1247.length; i += 1) {
    i1246.push( i1247[i + 0] );
  }
  i1238.allTags = i1246
  return i1238
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i1250 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i1251 = data
  i1250.name = i1251[0]
  i1250.value = i1251[1]
  return i1250
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i1254 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i1255 = data
  i1254.id = i1255[0]
  i1254.name = i1255[1]
  i1254.value = i1255[2]
  return i1254
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i1258 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i1259 = data
  i1258.id = i1259[0]
  i1258.name = i1259[1]
  return i1258
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i1260 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i1261 = data
  i1260.fixedDeltaTime = i1261[0]
  i1260.maximumDeltaTime = i1261[1]
  i1260.timeScale = i1261[2]
  i1260.maximumParticleTimestep = i1261[3]
  return i1260
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i1262 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i1263 = data
  i1262.gravity = new pc.Vec3( i1263[0], i1263[1], i1263[2] )
  i1262.defaultSolverIterations = i1263[3]
  i1262.bounceThreshold = i1263[4]
  i1262.autoSyncTransforms = !!i1263[5]
  i1262.autoSimulation = !!i1263[6]
  var i1265 = i1263[7]
  var i1264 = []
  for(var i = 0; i < i1265.length; i += 1) {
    i1264.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i1265[i + 0]) );
  }
  i1262.collisionMatrix = i1264
  return i1262
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i1268 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i1269 = data
  i1268.enabled = !!i1269[0]
  i1268.layerId = i1269[1]
  i1268.otherLayerId = i1269[2]
  return i1268
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i1270 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i1271 = data
  request.r(i1271[0], i1271[1], 0, i1270, 'material')
  i1270.gravity = new pc.Vec2( i1271[2], i1271[3] )
  i1270.positionIterations = i1271[4]
  i1270.velocityIterations = i1271[5]
  i1270.velocityThreshold = i1271[6]
  i1270.maxLinearCorrection = i1271[7]
  i1270.maxAngularCorrection = i1271[8]
  i1270.maxTranslationSpeed = i1271[9]
  i1270.maxRotationSpeed = i1271[10]
  i1270.baumgarteScale = i1271[11]
  i1270.baumgarteTOIScale = i1271[12]
  i1270.timeToSleep = i1271[13]
  i1270.linearSleepTolerance = i1271[14]
  i1270.angularSleepTolerance = i1271[15]
  i1270.defaultContactOffset = i1271[16]
  i1270.autoSimulation = !!i1271[17]
  i1270.queriesHitTriggers = !!i1271[18]
  i1270.queriesStartInColliders = !!i1271[19]
  i1270.callbacksOnDisable = !!i1271[20]
  i1270.reuseCollisionCallbacks = !!i1271[21]
  i1270.autoSyncTransforms = !!i1271[22]
  var i1273 = i1271[23]
  var i1272 = []
  for(var i = 0; i < i1273.length; i += 1) {
    i1272.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i1273[i + 0]) );
  }
  i1270.collisionMatrix = i1272
  return i1270
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i1276 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i1277 = data
  i1276.enabled = !!i1277[0]
  i1276.layerId = i1277[1]
  i1276.otherLayerId = i1277[2]
  return i1276
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i1278 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i1279 = data
  var i1281 = i1279[0]
  var i1280 = []
  for(var i = 0; i < i1281.length; i += 1) {
    i1280.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1281[i + 0]) );
  }
  i1278.qualityLevels = i1280
  var i1283 = i1279[1]
  var i1282 = []
  for(var i = 0; i < i1283.length; i += 1) {
    i1282.push( i1283[i + 0] );
  }
  i1278.names = i1282
  i1278.shadows = i1279[2]
  i1278.anisotropicFiltering = i1279[3]
  i1278.antiAliasing = i1279[4]
  i1278.lodBias = i1279[5]
  i1278.shadowCascades = i1279[6]
  i1278.shadowDistance = i1279[7]
  i1278.shadowmaskMode = i1279[8]
  i1278.shadowProjection = i1279[9]
  i1278.shadowResolution = i1279[10]
  i1278.softParticles = !!i1279[11]
  i1278.softVegetation = !!i1279[12]
  i1278.activeColorSpace = i1279[13]
  i1278.desiredColorSpace = i1279[14]
  i1278.masterTextureLimit = i1279[15]
  i1278.maxQueuedFrames = i1279[16]
  i1278.particleRaycastBudget = i1279[17]
  i1278.pixelLightCount = i1279[18]
  i1278.realtimeReflectionProbes = !!i1279[19]
  i1278.shadowCascade2Split = i1279[20]
  i1278.shadowCascade4Split = new pc.Vec3( i1279[21], i1279[22], i1279[23] )
  i1278.streamingMipmapsActive = !!i1279[24]
  i1278.vSyncCount = i1279[25]
  i1278.asyncUploadBufferSize = i1279[26]
  i1278.asyncUploadTimeSlice = i1279[27]
  i1278.billboardsFaceCameraPosition = !!i1279[28]
  i1278.shadowNearPlaneOffset = i1279[29]
  i1278.streamingMipmapsMemoryBudget = i1279[30]
  i1278.maximumLODLevel = i1279[31]
  i1278.streamingMipmapsAddAllCameras = !!i1279[32]
  i1278.streamingMipmapsMaxLevelReduction = i1279[33]
  i1278.streamingMipmapsRenderersPerFrame = i1279[34]
  i1278.resolutionScalingFixedDPIFactor = i1279[35]
  i1278.streamingMipmapsMaxFileIORequests = i1279[36]
  i1278.currentQualityLevel = i1279[37]
  return i1278
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i1288 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i1289 = data
  i1288.weight = i1289[0]
  i1288.vertices = i1289[1]
  i1288.normals = i1289[2]
  i1288.tangents = i1289[3]
  return i1288
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition"] = function (request, data, root) {
  var i1292 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition' )
  var i1293 = data
  i1292.mode = i1293[0]
  i1292.parameter = i1293[1]
  i1292.threshold = i1293[2]
  return i1292
}

Deserializers["TMPro.GlyphAnchorPoint"] = function (request, data, root) {
  var i1294 = root || request.c( 'TMPro.GlyphAnchorPoint' )
  var i1295 = data
  i1294.m_XCoordinate = i1295[0]
  i1294.m_YCoordinate = i1295[1]
  return i1294
}

Deserializers["TMPro.MarkPositionAdjustment"] = function (request, data, root) {
  var i1296 = root || request.c( 'TMPro.MarkPositionAdjustment' )
  var i1297 = data
  i1296.m_XPositionAdjustment = i1297[0]
  i1296.m_YPositionAdjustment = i1297[1]
  return i1296
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i1298 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i1299 = data
  i1298.xPlacement = i1299[0]
  i1298.yPlacement = i1299[1]
  i1298.xAdvance = i1299[2]
  i1298.yAdvance = i1299[3]
  return i1298
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"useSimplification":2,"useUInt32IndexFormat":3,"vertexCount":4,"aabb":5,"streams":6,"vertices":7,"subMeshes":8,"bindposes":9,"blendShapes":10},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Components.Transform":{"position":0,"scale":3,"rotation":6},"Luna.Unity.DTO.UnityEngine.Components.Animator":{"animatorController":0,"avatar":2,"updateMode":4,"hasTransformHierarchy":5,"applyRootMotion":6,"humanBones":7,"enabled":8},"Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer":{"color":0,"sprite":4,"flipX":6,"flipY":7,"drawMode":8,"size":9,"tileMode":11,"adaptiveModeThreshold":12,"maskInteraction":13,"spriteSortPoint":14,"enabled":15,"sharedMaterial":16,"sharedMaterials":18,"receiveShadows":19,"shadowCastingMode":20,"sortingLayerID":21,"sortingOrder":22,"lightmapIndex":23,"lightmapSceneIndex":24,"lightmapScaleOffset":25,"lightProbeUsage":29,"reflectionProbeUsage":30},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider":{"center":0,"radius":3,"height":4,"direction":5,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"referenceAmbientProbe":36,"useReferenceAmbientProbe":37,"customReflection":38,"defaultReflection":40,"defaultReflectionMode":42,"defaultReflectionResolution":43,"sunLightObjectId":44,"pixelLightCount":45,"defaultReflectionHDR":46,"hasLightDataAsset":47,"hasManualGenerate":48},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip":{"name":0,"wrapMode":1,"isLooping":2,"length":3,"curves":4,"events":5,"halfPrecision":6,"_frameRate":7,"localBounds":8,"hasMuscleCurves":9,"clipMuscleConstant":10,"clipBindingConstant":11},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve":{"path":0,"hash":1,"componentType":2,"property":3,"keys":4,"objectReferenceKeys":5},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey":{"time":0,"value":1},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent":{"functionName":0,"floatParameter":1,"intParameter":2,"stringParameter":3,"objectReferenceParameter":4,"time":6},"Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds":{"center":0,"extends":3},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant":{"genericBindings":0,"pptrCurveMapping":1},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController":{"name":0,"layers":1,"parameters":2,"animationClips":3,"avatarUnsupported":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer":{"name":0,"defaultWeight":1,"blendingMode":2,"avatarMask":3,"syncedLayerIndex":4,"syncedLayerAffectsTiming":5,"syncedLayers":6,"stateMachine":7},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine":{"id":0,"name":1,"path":2,"states":3,"machines":4,"entryStateTransitions":5,"exitStateTransitions":6,"anyStateTransitions":7,"defaultStateId":8},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState":{"id":0,"name":1,"cycleOffset":2,"cycleOffsetParameter":3,"cycleOffsetParameterActive":4,"mirror":5,"mirrorParameter":6,"mirrorParameterActive":7,"motionId":8,"nameHash":9,"fullPathHash":10,"speed":11,"speedParameter":12,"speedParameterActive":13,"tag":14,"tagHash":15,"writeDefaultValues":16,"behaviours":17,"transitions":18},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition":{"fullPath":0,"canTransitionToSelf":1,"duration":2,"exitTime":3,"hasExitTime":4,"hasFixedDuration":5,"interruptionSource":6,"offset":7,"orderedInterruption":8,"destinationStateId":9,"isExit":10,"mute":11,"solo":12,"conditions":13},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition":{"destinationStateId":0,"isExit":1,"mute":2,"solo":3,"conditions":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter":{"defaultBool":0,"defaultFloat":1,"defaultInt":2,"name":3,"nameHash":4,"type":5},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"lightmapEncodingQuality":11,"desiredColorSpace":12,"allTags":13},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition":{"mode":0,"parameter":1,"threshold":2}}

Deserializers.requiredComponents = {"47":[48],"49":[48],"50":[48],"51":[48],"52":[48],"53":[48],"54":[55],"56":[8],"57":[58],"59":[58],"60":[58],"61":[58],"62":[58],"63":[58],"64":[65],"66":[65],"67":[65],"68":[65],"69":[65],"70":[65],"71":[65],"72":[65],"73":[65],"74":[65],"75":[65],"76":[65],"77":[65],"78":[8],"79":[28],"80":[81],"82":[81],"83":[27],"11":[8],"84":[85],"86":[27],"87":[88,27],"37":[28],"89":[88,27],"90":[3,28],"91":[28],"92":[28,35],"93":[58],"94":[65],"95":[85],"96":[97],"98":[5],"99":[8],"100":[101],"102":[38],"103":[83],"104":[27],"30":[28,27],"105":[27,88],"106":[27],"107":[88,27],"108":[28],"109":[88,27],"110":[27],"111":[112],"113":[112],"114":[112],"115":[27],"116":[27],"117":[83],"118":[88,27],"119":[27],"120":[83],"121":[27],"122":[27],"123":[27],"124":[27],"125":[27],"126":[27],"127":[27],"128":[27],"129":[27],"130":[88,27],"131":[27],"132":[27],"133":[27],"134":[27],"135":[88,27],"136":[27],"137":[38],"138":[38],"39":[38],"139":[38],"140":[8],"141":[8]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Texture2D","UnityEngine.Transform","UnityEngine.Animator","UnityEditor.Animations.AnimatorController","UnityEngine.SpriteRenderer","UnityEngine.Sprite","UnityEngine.Material","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.MonoBehaviour","AutoCameraFit","CharacterManager","Character","EquipmentSetData","Spine.Unity.SkeletonDataAsset","GameManager","SlotManager","SlotSetup","UnityEngine.GameObject","Ply_Pool","Ply_SoundManager","UnityEngine.AudioClip","UnityEngine.AudioSource","ProgressTrackingManager","ScreenHeightPositionAnchor","SlotDataSO","UnityEngine.RectTransform","UnityEngine.MeshRenderer","UnityEngine.EventSystems.UIBehaviour","TMPro.TextMeshPro","TMPro.TMP_FontAsset","UnityEngine.CapsuleCollider","BalloonController","BalloonActionTrigger","UnityEngine.MeshFilter","UnityEngine.Mesh","Spine.Unity.SkeletonAnimation","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","Spine.Unity.SpineAtlasAsset","UnityEngine.TextAsset","UnityEngine.Font","DG.Tweening.Core.DOTweenSettings","TMPro.TMP_Settings","TMPro.TMP_SpriteAsset","TMPro.TMP_StyleSheet","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.SkinnedMeshRenderer","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.Canvas","Spine.Unity.EditorSkeletonPlayer","Spine.Unity.ISkeletonAnimation","Spine.Unity.BoneFollowerGraphic","Spine.Unity.SkeletonSubmeshGraphic","UnityEngine.CanvasRenderer","Spine.Unity.SkeletonGraphic","Spine.Unity.SkeletonMecanim","Spine.Unity.SkeletonRenderer","Spine.Unity.SkeletonPartsRenderer","Spine.Unity.FollowLocationRigidbody","Spine.Unity.FollowLocationRigidbody2D","Spine.Unity.SkeletonUtility","Spine.Unity.SkeletonUtilityConstraint","Spine.Unity.SkeletonUtilityBone","UnityEngine.U2D.Animation.SpriteSkin","UnityEngine.U2D.PixelPerfectCamera","UnityEngine.U2D.SpriteShapeController","UnityEngine.U2D.SpriteShapeRenderer","UnityEngine.InputSystem.UI.InputSystemUIInputModule","UnityEngine.InputSystem.UI.TrackedDeviceRaycaster","TMPro.TextContainer","TMPro.TextMeshProUGUI","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.GraphicRaycaster","UnityEngine.UI.Image","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.CanvasScaler","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.Mask","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.Scrollbar","UnityEngine.UI.ScrollRect","UnityEngine.UI.Slider","UnityEngine.UI.Text","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.38f1";

Deserializers.productName = "PLY_LeftOrRight";

Deserializers.lunaInitializationTime = "07/24/2026 10:13:04";

Deserializers.lunaDaysRunning = "3.7";

Deserializers.lunaVersion = "7.1.0";

Deserializers.lunaSHA = "cf93782349542fe0b84ad13951a26809f8419628";

Deserializers.creativeName = "LeftOrRight_Ply2";

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

Deserializers.buildID = "aeb07282-5eb3-4aa8-8af5-621b46edb10b";

Deserializers.runtimeInitializeOnLoadInfos = [[["Unity","Services","Core","Internal","UnityServicesInitializer","EnableServicesInitializationAsync"],["UnityEngine","U2D","Animation","GpuDeformationSystem","CreateFallbackBuffer"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["DG","Tweening","DOTween","RuntimeOnLoad"],["Sirenix","Utilities","UnityVersion","EnsureLoaded"],["Sirenix","Serialization","Utilities","UnityVersion","EnsureLoaded"],["Sirenix","Serialization","UnitySerializationInitializer","InitializeRuntime"],["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["Unity","Services","Core","Registration","CorePackageInitializer","InitializeOnLoad"],["Unity","Services","Core","Internal","TaskAsyncOperation","SetScheduler"],["Unity","Services","Core","Environments","Client","Scheduler","EngineStateHelper","Init"],["Unity","Services","Core","Environments","Client","Scheduler","ThreadHelper","Init"],["Ua2CoreInitializeCallback","Register"],["UnityEngine","InputSystem","InputSystem","RunInitialUpdate"],["Unity","AI","Navigation","NavMeshLink","ClearTrackedList"],["Unity","AI","Navigation","NavMeshSurface","ClearNavMeshSurfaces"],["Unity","AI","Navigation","NavMeshModifierVolume","ClearNavMeshModifiers"],["Unity","AI","Navigation","NavMeshModifier","ClearNavMeshModifiers"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["Unity","Services","Core","Internal","UnityServicesInitializer","CreateStaticInstance"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"]],[["Unity","Services","Core","Environments","Client","Http","JsonHelpers","RegisterTypesForAOT"]],[["Unity","Services","Core","UnityThreadUtils","CaptureUnityThreadInfo"],["UnityEngine","InputSystem","Plugins","InputForUI","InputSystemProvider","Bootstrap"],["UnityEngine","InputSystem","InputSystem","RunInitializeInPlayer"],["Spine","Unity","AttachmentTools","AtlasUtilities","Init"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

