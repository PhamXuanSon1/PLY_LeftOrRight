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

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider"] = function (request, data, root) {
  var i804 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider' )
  var i805 = data
  i804.center = new pc.Vec3( i805[0], i805[1], i805[2] )
  i804.radius = i805[3]
  i804.height = i805[4]
  i804.direction = i805[5]
  i804.enabled = !!i805[6]
  i804.isTrigger = !!i805[7]
  request.r(i805[8], i805[9], 0, i804, 'material')
  return i804
}

Deserializers["BalloonController"] = function (request, data, root) {
  var i806 = root || request.c( 'BalloonController' )
  var i807 = data
  request.r(i807[0], i807[1], 0, i806, 'targetItem')
  i806.interactableLayer = UnityEngine.LayerMask.FromIntegerValue( i807[2] )
  i806.flyDuration = i807[3]
  i806.scaleDuration = i807[4]
  i806.delayBeforeNextSlot = i807[5]
  i806.onBalloonClicked = request.d('UnityEngine.Events.UnityEvent', i807[6], i806.onBalloonClicked)
  return i806
}

Deserializers["UnityEngine.Events.UnityEvent"] = function (request, data, root) {
  var i808 = root || request.c( 'UnityEngine.Events.UnityEvent' )
  var i809 = data
  i808.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i809[0], i808.m_PersistentCalls)
  return i808
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i810 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i811 = data
  var i813 = i811[0]
  var i812 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i813.length; i += 1) {
    i812.add(request.d('UnityEngine.Events.PersistentCall', i813[i + 0]));
  }
  i810.m_Calls = i812
  return i810
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i816 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i817 = data
  request.r(i817[0], i817[1], 0, i816, 'm_Target')
  i816.m_TargetAssemblyTypeName = i817[2]
  i816.m_MethodName = i817[3]
  i816.m_Mode = i817[4]
  i816.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i817[5], i816.m_Arguments)
  i816.m_CallState = i817[6]
  return i816
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i818 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i819 = data
  request.r(i819[0], i819[1], 0, i818, 'm_ObjectArgument')
  i818.m_ObjectArgumentAssemblyTypeName = i819[2]
  i818.m_IntArgument = i819[3]
  i818.m_FloatArgument = i819[4]
  i818.m_StringArgument = i819[5]
  i818.m_BoolArgument = !!i819[6]
  return i818
}

Deserializers["BalloonActionTrigger"] = function (request, data, root) {
  var i820 = root || request.c( 'BalloonActionTrigger' )
  var i821 = data
  request.r(i821[0], i821[1], 0, i820, 'targetCharacter')
  i820.animationTrack = i821[2]
  i820.animationName = i821[3]
  i820.clearOtherAnimations = !!i821[4]
  request.r(i821[5], i821[6], 0, i820, 'skeletonDataAsset')
  return i820
}

Deserializers["SlotSetup"] = function (request, data, root) {
  var i822 = root || request.c( 'SlotSetup' )
  var i823 = data
  request.r(i823[0], i823[1], 0, i822, 'slotData')
  request.r(i823[2], i823[3], 0, i822, 'borderGold')
  request.r(i823[4], i823[5], 0, i822, 'borderWhite')
  request.r(i823[6], i823[7], 0, i822, 'greyCard')
  request.r(i823[8], i823[9], 0, i822, 'blueCard')
  request.r(i823[10], i823[11], 0, i822, 'greenCard')
  request.r(i823[12], i823[13], 0, i822, 'greenTick')
  request.r(i823[14], i823[15], 0, i822, 'leftBalloonObj')
  request.r(i823[16], i823[17], 0, i822, 'rightBalloonObj')
  request.r(i823[18], i823[19], 0, i822, 'leftBalloonItemRenderer')
  request.r(i823[20], i823[21], 0, i822, 'rightBalloonItemRenderer')
  return i822
}

Deserializers["ScreenHeightPositionAnchor"] = function (request, data, root) {
  var i824 = root || request.c( 'ScreenHeightPositionAnchor' )
  var i825 = data
  request.r(i825[0], i825[1], 0, i824, 'anchorPoint')
  request.r(i825[2], i825[3], 0, i824, 'targetCamera')
  i824.viewportYRatio = i825[4]
  i824.alignOnStart = !!i825[5]
  i824.alignOnEnable = !!i825[6]
  i824.alwaysUpdate = !!i825[7]
  i824.realignOnScreenSizeChanged = !!i825[8]
  i824.drawGizmos = !!i825[9]
  i824.targetLineColor = new pc.Color(i825[10], i825[11], i825[12], i825[13])
  i824.anchorColor = new pc.Color(i825[14], i825[15], i825[16], i825[17])
  return i824
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i826 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i827 = data
  request.r(i827[0], i827[1], 0, i826, 'sharedMesh')
  return i826
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i828 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i829 = data
  request.r(i829[0], i829[1], 0, i828, 'additionalVertexStreams')
  i828.enabled = !!i829[2]
  request.r(i829[3], i829[4], 0, i828, 'sharedMaterial')
  var i831 = i829[5]
  var i830 = []
  for(var i = 0; i < i831.length; i += 2) {
  request.r(i831[i + 0], i831[i + 1], 2, i830, '')
  }
  i828.sharedMaterials = i830
  i828.receiveShadows = !!i829[6]
  i828.shadowCastingMode = i829[7]
  i828.sortingLayerID = i829[8]
  i828.sortingOrder = i829[9]
  i828.lightmapIndex = i829[10]
  i828.lightmapSceneIndex = i829[11]
  i828.lightmapScaleOffset = new pc.Vec4( i829[12], i829[13], i829[14], i829[15] )
  i828.lightProbeUsage = i829[16]
  i828.reflectionProbeUsage = i829[17]
  return i828
}

Deserializers["Spine.Unity.SkeletonAnimation"] = function (request, data, root) {
  var i832 = root || request.c( 'Spine.Unity.SkeletonAnimation' )
  var i833 = data
  i832.loop = !!i833[0]
  i832.timeScale = i833[1]
  request.r(i833[2], i833[3], 0, i832, 'skeletonDataAsset')
  i832.initialSkinName = i833[4]
  i832.fixPrefabOverrideViaMeshFilter = i833[5]
  i832.initialFlipX = !!i833[6]
  i832.initialFlipY = !!i833[7]
  i832.updateWhenInvisible = i833[8]
  i832.zSpacing = i833[9]
  i832.useClipping = !!i833[10]
  i832.immutableTriangles = !!i833[11]
  i832.pmaVertexColors = !!i833[12]
  i832.clearStateOnDisable = !!i833[13]
  i832.tintBlack = !!i833[14]
  i832.singleSubmesh = !!i833[15]
  i832.fixDrawOrder = !!i833[16]
  i832.addNormals = !!i833[17]
  i832.calculateTangents = !!i833[18]
  i832.maskInteraction = i833[19]
  i832.maskMaterials = request.d('Spine.Unity.SkeletonRenderer+SpriteMaskInteractionMaterials', i833[20], i832.maskMaterials)
  i832.disableRenderingOnOverride = !!i833[21]
  i832.updateTiming = i833[22]
  i832.unscaledTime = !!i833[23]
  i832._animationName = i833[24]
  var i835 = i833[25]
  var i834 = []
  for(var i = 0; i < i835.length; i += 1) {
    i834.push( i835[i + 0] );
  }
  i832.separatorSlotNames = i834
  i832.physicsPositionInheritanceFactor = new pc.Vec2( i833[26], i833[27] )
  i832.physicsRotationInheritanceFactor = i833[28]
  request.r(i833[29], i833[30], 0, i832, 'physicsMovementRelativeTo')
  return i832
}

Deserializers["Spine.Unity.SkeletonRenderer+SpriteMaskInteractionMaterials"] = function (request, data, root) {
  var i836 = root || request.c( 'Spine.Unity.SkeletonRenderer+SpriteMaskInteractionMaterials' )
  var i837 = data
  var i839 = i837[0]
  var i838 = []
  for(var i = 0; i < i839.length; i += 2) {
  request.r(i839[i + 0], i839[i + 1], 2, i838, '')
  }
  i836.materialsMaskDisabled = i838
  var i841 = i837[1]
  var i840 = []
  for(var i = 0; i < i841.length; i += 2) {
  request.r(i841[i + 0], i841[i + 1], 2, i840, '')
  }
  i836.materialsInsideMask = i840
  var i843 = i837[2]
  var i842 = []
  for(var i = 0; i < i843.length; i += 2) {
  request.r(i843[i + 0], i843[i + 1], 2, i842, '')
  }
  i836.materialsOutsideMask = i842
  return i836
}

Deserializers["Character"] = function (request, data, root) {
  var i846 = root || request.c( 'Character' )
  var i847 = data
  var i849 = i847[0]
  var i848 = new (System.Collections.Generic.List$1(Bridge.ns('System.String')))
  for(var i = 0; i < i849.length; i += 1) {
    i848.add(i849[i + 0]);
  }
  i846.currentAppliedSkinNames = i848
  request.r(i847[1], i847[2], 0, i846, 'tf')
  request.r(i847[3], i847[4], 0, i846, 'skeletonAnimation')
  var i851 = i847[5]
  var i850 = new (System.Collections.Generic.List$1(Bridge.ns('SlotAttachmentPair')))
  for(var i = 0; i < i851.length; i += 1) {
    i850.add(request.d('SlotAttachmentPair', i851[i + 0]));
  }
  i846.currentAppliedPairs = i850
  return i846
}

Deserializers["SlotAttachmentPair"] = function (request, data, root) {
  var i856 = root || request.c( 'SlotAttachmentPair' )
  var i857 = data
  i856.isEnabled = !!i857[0]
  i856.slotName = i857[1]
  i856.attachmentName = i857[2]
  request.r(i857[3], i857[4], 0, i856, 'skeletonDataAsset')
  return i856
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i858 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i859 = data
  i858.pivot = new pc.Vec2( i859[0], i859[1] )
  i858.anchorMin = new pc.Vec2( i859[2], i859[3] )
  i858.anchorMax = new pc.Vec2( i859[4], i859[5] )
  i858.sizeDelta = new pc.Vec2( i859[6], i859[7] )
  i858.anchoredPosition3D = new pc.Vec3( i859[8], i859[9], i859[10] )
  i858.rotation = new pc.Quat(i859[11], i859[12], i859[13], i859[14])
  i858.scale = new pc.Vec3( i859[15], i859[16], i859[17] )
  return i858
}

Deserializers["TMPro.TextMeshPro"] = function (request, data, root) {
  var i860 = root || request.c( 'TMPro.TextMeshPro' )
  var i861 = data
  i860._SortingLayer = i861[0]
  i860._SortingLayerID = i861[1]
  i860._SortingOrder = i861[2]
  i860.m_hasFontAssetChanged = !!i861[3]
  request.r(i861[4], i861[5], 0, i860, 'm_renderer')
  i860.m_maskType = i861[6]
  i860.m_text = i861[7]
  i860.m_isRightToLeft = !!i861[8]
  request.r(i861[9], i861[10], 0, i860, 'm_fontAsset')
  request.r(i861[11], i861[12], 0, i860, 'm_sharedMaterial')
  var i863 = i861[13]
  var i862 = []
  for(var i = 0; i < i863.length; i += 2) {
  request.r(i863[i + 0], i863[i + 1], 2, i862, '')
  }
  i860.m_fontSharedMaterials = i862
  request.r(i861[14], i861[15], 0, i860, 'm_fontMaterial')
  var i865 = i861[16]
  var i864 = []
  for(var i = 0; i < i865.length; i += 2) {
  request.r(i865[i + 0], i865[i + 1], 2, i864, '')
  }
  i860.m_fontMaterials = i864
  i860.m_fontColor32 = UnityEngine.Color32.ConstructColor(i861[17], i861[18], i861[19], i861[20])
  i860.m_fontColor = new pc.Color(i861[21], i861[22], i861[23], i861[24])
  i860.m_enableVertexGradient = !!i861[25]
  i860.m_colorMode = i861[26]
  i860.m_fontColorGradient = request.d('TMPro.VertexGradient', i861[27], i860.m_fontColorGradient)
  request.r(i861[28], i861[29], 0, i860, 'm_fontColorGradientPreset')
  request.r(i861[30], i861[31], 0, i860, 'm_spriteAsset')
  i860.m_tintAllSprites = !!i861[32]
  request.r(i861[33], i861[34], 0, i860, 'm_StyleSheet')
  i860.m_TextStyleHashCode = i861[35]
  i860.m_overrideHtmlColors = !!i861[36]
  i860.m_faceColor = UnityEngine.Color32.ConstructColor(i861[37], i861[38], i861[39], i861[40])
  i860.m_fontSize = i861[41]
  i860.m_fontSizeBase = i861[42]
  i860.m_fontWeight = i861[43]
  i860.m_enableAutoSizing = !!i861[44]
  i860.m_fontSizeMin = i861[45]
  i860.m_fontSizeMax = i861[46]
  i860.m_fontStyle = i861[47]
  i860.m_HorizontalAlignment = i861[48]
  i860.m_VerticalAlignment = i861[49]
  i860.m_textAlignment = i861[50]
  i860.m_characterSpacing = i861[51]
  i860.m_wordSpacing = i861[52]
  i860.m_lineSpacing = i861[53]
  i860.m_lineSpacingMax = i861[54]
  i860.m_paragraphSpacing = i861[55]
  i860.m_charWidthMaxAdj = i861[56]
  i860.m_TextWrappingMode = i861[57]
  i860.m_wordWrappingRatios = i861[58]
  i860.m_overflowMode = i861[59]
  request.r(i861[60], i861[61], 0, i860, 'm_linkedTextComponent')
  request.r(i861[62], i861[63], 0, i860, 'parentLinkedComponent')
  i860.m_enableKerning = !!i861[64]
  var i867 = i861[65]
  var i866 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i867.length; i += 1) {
    i866.add(i867[i + 0]);
  }
  i860.m_ActiveFontFeatures = i866
  i860.m_enableExtraPadding = !!i861[66]
  i860.checkPaddingRequired = !!i861[67]
  i860.m_isRichText = !!i861[68]
  i860.m_parseCtrlCharacters = !!i861[69]
  i860.m_isOrthographic = !!i861[70]
  i860.m_isCullingEnabled = !!i861[71]
  i860.m_horizontalMapping = i861[72]
  i860.m_verticalMapping = i861[73]
  i860.m_uvLineOffset = i861[74]
  i860.m_geometrySortingOrder = i861[75]
  i860.m_IsTextObjectScaleStatic = !!i861[76]
  i860.m_VertexBufferAutoSizeReduction = !!i861[77]
  i860.m_useMaxVisibleDescender = !!i861[78]
  i860.m_pageToDisplay = i861[79]
  i860.m_margin = new pc.Vec4( i861[80], i861[81], i861[82], i861[83] )
  i860.m_isUsingLegacyAnimationComponent = !!i861[84]
  i860.m_isVolumetricText = !!i861[85]
  request.r(i861[86], i861[87], 0, i860, 'm_Material')
  i860.m_EmojiFallbackSupport = !!i861[88]
  i860.m_Maskable = !!i861[89]
  i860.m_Color = new pc.Color(i861[90], i861[91], i861[92], i861[93])
  i860.m_RaycastTarget = !!i861[94]
  i860.m_RaycastPadding = new pc.Vec4( i861[95], i861[96], i861[97], i861[98] )
  return i860
}

Deserializers["TMPro.VertexGradient"] = function (request, data, root) {
  var i868 = root || request.c( 'TMPro.VertexGradient' )
  var i869 = data
  i868.topLeft = new pc.Color(i869[0], i869[1], i869[2], i869[3])
  i868.topRight = new pc.Color(i869[4], i869[5], i869[6], i869[7])
  i868.bottomLeft = new pc.Color(i869[8], i869[9], i869[10], i869[11])
  i868.bottomRight = new pc.Color(i869[12], i869[13], i869[14], i869[15])
  return i868
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

Deserializers["Spine.Unity.SkeletonDataAsset"] = function (request, data, root) {
  var i1048 = root || request.c( 'Spine.Unity.SkeletonDataAsset' )
  var i1049 = data
  var i1051 = i1049[0]
  var i1050 = []
  for(var i = 0; i < i1051.length; i += 2) {
  request.r(i1051[i + 0], i1051[i + 1], 2, i1050, '')
  }
  i1048.atlasAssets = i1050
  i1048.scale = i1049[1]
  request.r(i1049[2], i1049[3], 0, i1048, 'skeletonJSON')
  i1048.isUpgradingBlendModeMaterials = !!i1049[4]
  i1048.blendModeMaterials = request.d('Spine.Unity.BlendModeMaterials', i1049[5], i1048.blendModeMaterials)
  var i1053 = i1049[6]
  var i1052 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.SkeletonDataModifierAsset')))
  for(var i = 0; i < i1053.length; i += 2) {
  request.r(i1053[i + 0], i1053[i + 1], 1, i1052, '')
  }
  i1048.skeletonDataModifiers = i1052
  var i1055 = i1049[7]
  var i1054 = []
  for(var i = 0; i < i1055.length; i += 1) {
    i1054.push( i1055[i + 0] );
  }
  i1048.fromAnimation = i1054
  var i1057 = i1049[8]
  var i1056 = []
  for(var i = 0; i < i1057.length; i += 1) {
    i1056.push( i1057[i + 0] );
  }
  i1048.toAnimation = i1056
  i1048.duration = i1049[9]
  i1048.defaultMix = i1049[10]
  request.r(i1049[11], i1049[12], 0, i1048, 'controller')
  return i1048
}

Deserializers["Spine.Unity.BlendModeMaterials"] = function (request, data, root) {
  var i1060 = root || request.c( 'Spine.Unity.BlendModeMaterials' )
  var i1061 = data
  i1060.applyAdditiveMaterial = !!i1061[0]
  var i1063 = i1061[1]
  var i1062 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.BlendModeMaterials+ReplacementMaterial')))
  for(var i = 0; i < i1063.length; i += 1) {
    i1062.add(request.d('Spine.Unity.BlendModeMaterials+ReplacementMaterial', i1063[i + 0]));
  }
  i1060.additiveMaterials = i1062
  var i1065 = i1061[2]
  var i1064 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.BlendModeMaterials+ReplacementMaterial')))
  for(var i = 0; i < i1065.length; i += 1) {
    i1064.add(request.d('Spine.Unity.BlendModeMaterials+ReplacementMaterial', i1065[i + 0]));
  }
  i1060.multiplyMaterials = i1064
  var i1067 = i1061[3]
  var i1066 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.BlendModeMaterials+ReplacementMaterial')))
  for(var i = 0; i < i1067.length; i += 1) {
    i1066.add(request.d('Spine.Unity.BlendModeMaterials+ReplacementMaterial', i1067[i + 0]));
  }
  i1060.screenMaterials = i1066
  i1060.requiresBlendModeMaterials = !!i1061[4]
  return i1060
}

Deserializers["Spine.Unity.BlendModeMaterials+ReplacementMaterial"] = function (request, data, root) {
  var i1070 = root || request.c( 'Spine.Unity.BlendModeMaterials+ReplacementMaterial' )
  var i1071 = data
  i1070.pageName = i1071[0]
  request.r(i1071[1], i1071[2], 0, i1070, 'material')
  return i1070
}

Deserializers["Spine.Unity.SpineAtlasAsset"] = function (request, data, root) {
  var i1074 = root || request.c( 'Spine.Unity.SpineAtlasAsset' )
  var i1075 = data
  request.r(i1075[0], i1075[1], 0, i1074, 'atlasFile')
  var i1077 = i1075[2]
  var i1076 = []
  for(var i = 0; i < i1077.length; i += 2) {
  request.r(i1077[i + 0], i1077[i + 1], 2, i1076, '')
  }
  i1074.materials = i1076
  i1074.textureLoadingMode = i1075[3]
  request.r(i1075[4], i1075[5], 0, i1074, 'onDemandTextureLoader')
  return i1074
}

Deserializers["SlotDataSO"] = function (request, data, root) {
  var i1078 = root || request.c( 'SlotDataSO' )
  var i1079 = data
  i1078.slotName = i1079[0]
  request.r(i1079[1], i1079[2], 0, i1078, 'leftItemSprite')
  request.r(i1079[3], i1079[4], 0, i1078, 'rightItemSprite')
  return i1078
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

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i1108 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i1109 = data
  i1108.m_Width = i1109[0]
  i1108.m_Height = i1109[1]
  i1108.m_HorizontalBearingX = i1109[2]
  i1108.m_HorizontalBearingY = i1109[3]
  i1108.m_HorizontalAdvance = i1109[4]
  return i1108
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i1110 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i1111 = data
  i1110.m_X = i1111[0]
  i1110.m_Y = i1111[1]
  i1110.m_Width = i1111[2]
  i1110.m_Height = i1111[3]
  return i1110
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i1114 = root || request.c( 'TMPro.TMP_Character' )
  var i1115 = data
  i1114.m_ElementType = i1115[0]
  i1114.m_Unicode = i1115[1]
  i1114.m_GlyphIndex = i1115[2]
  i1114.m_Scale = i1115[3]
  return i1114
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i1120 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i1121 = data
  var i1123 = i1121[0]
  var i1122 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i1123.length; i += 1) {
    i1122.add(request.d('TMPro.MultipleSubstitutionRecord', i1123[i + 0]));
  }
  i1120.m_MultipleSubstitutionRecords = i1122
  var i1125 = i1121[1]
  var i1124 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i1125.length; i += 1) {
    i1124.add(request.d('TMPro.LigatureSubstitutionRecord', i1125[i + 0]));
  }
  i1120.m_LigatureSubstitutionRecords = i1124
  var i1127 = i1121[2]
  var i1126 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i1127.length; i += 1) {
    i1126.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i1127[i + 0]));
  }
  i1120.m_GlyphPairAdjustmentRecords = i1126
  var i1129 = i1121[3]
  var i1128 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i1129.length; i += 1) {
    i1128.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i1129[i + 0]));
  }
  i1120.m_MarkToBaseAdjustmentRecords = i1128
  var i1131 = i1121[4]
  var i1130 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i1131.length; i += 1) {
    i1130.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i1131[i + 0]));
  }
  i1120.m_MarkToMarkAdjustmentRecords = i1130
  return i1120
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i1134 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i1135 = data
  i1134.m_TargetGlyphID = i1135[0]
  i1134.m_SubstituteGlyphIDs = i1135[1]
  return i1134
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i1138 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i1139 = data
  i1138.m_ComponentGlyphIDs = i1139[0]
  i1138.m_LigatureGlyphID = i1139[1]
  return i1138
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i1142 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i1143 = data
  i1142.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i1143[0], i1142.m_FirstAdjustmentRecord)
  i1142.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i1143[1], i1142.m_SecondAdjustmentRecord)
  i1142.m_FeatureLookupFlags = i1143[2]
  return i1142
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i1144 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i1145 = data
  i1144.m_GlyphIndex = i1145[0]
  i1144.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i1145[1], i1144.m_GlyphValueRecord)
  return i1144
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i1146 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i1147 = data
  i1146.m_XPlacement = i1147[0]
  i1146.m_YPlacement = i1147[1]
  i1146.m_XAdvance = i1147[2]
  i1146.m_YAdvance = i1147[3]
  return i1146
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i1150 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i1151 = data
  i1150.m_BaseGlyphID = i1151[0]
  i1150.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i1151[1], i1150.m_BaseGlyphAnchorPoint)
  i1150.m_MarkGlyphID = i1151[2]
  i1150.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i1151[3], i1150.m_MarkPositionAdjustment)
  return i1150
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i1154 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i1155 = data
  i1154.m_BaseMarkGlyphID = i1155[0]
  i1154.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i1155[1], i1154.m_BaseMarkGlyphAnchorPoint)
  i1154.m_CombiningMarkGlyphID = i1155[2]
  i1154.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i1155[3], i1154.m_CombiningMarkPositionAdjustment)
  return i1154
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i1160 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i1161 = data
  request.r(i1161[0], i1161[1], 0, i1160, 'regularTypeface')
  request.r(i1161[2], i1161[3], 0, i1160, 'italicTypeface')
  return i1160
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i1162 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i1163 = data
  i1162.Name = i1163[0]
  i1162.PointSize = i1163[1]
  i1162.Scale = i1163[2]
  i1162.CharacterCount = i1163[3]
  i1162.LineHeight = i1163[4]
  i1162.Baseline = i1163[5]
  i1162.Ascender = i1163[6]
  i1162.CapHeight = i1163[7]
  i1162.Descender = i1163[8]
  i1162.CenterLine = i1163[9]
  i1162.SuperscriptOffset = i1163[10]
  i1162.SubscriptOffset = i1163[11]
  i1162.SubSize = i1163[12]
  i1162.Underline = i1163[13]
  i1162.UnderlineThickness = i1163[14]
  i1162.strikethrough = i1163[15]
  i1162.strikethroughThickness = i1163[16]
  i1162.TabWidth = i1163[17]
  i1162.Padding = i1163[18]
  i1162.AtlasWidth = i1163[19]
  i1162.AtlasHeight = i1163[20]
  return i1162
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i1166 = root || request.c( 'TMPro.TMP_Glyph' )
  var i1167 = data
  i1166.id = i1167[0]
  i1166.x = i1167[1]
  i1166.y = i1167[2]
  i1166.width = i1167[3]
  i1166.height = i1167[4]
  i1166.xOffset = i1167[5]
  i1166.yOffset = i1167[6]
  i1166.xAdvance = i1167[7]
  i1166.scale = i1167[8]
  return i1166
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i1168 = root || request.c( 'TMPro.KerningTable' )
  var i1169 = data
  var i1171 = i1169[0]
  var i1170 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i1171.length; i += 1) {
    i1170.add(request.d('TMPro.KerningPair', i1171[i + 0]));
  }
  i1168.kerningPairs = i1170
  return i1168
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i1174 = root || request.c( 'TMPro.KerningPair' )
  var i1175 = data
  i1174.xOffset = i1175[0]
  i1174.m_FirstGlyph = i1175[1]
  i1174.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i1175[2], i1174.m_FirstGlyphAdjustments)
  i1174.m_SecondGlyph = i1175[3]
  i1174.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i1175[4], i1174.m_SecondGlyphAdjustments)
  i1174.m_IgnoreSpacingAdjustments = !!i1175[5]
  return i1174
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i1176 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i1177 = data
  i1176.m_FaceIndex = i1177[0]
  i1176.m_FamilyName = i1177[1]
  i1176.m_StyleName = i1177[2]
  i1176.m_PointSize = i1177[3]
  i1176.m_Scale = i1177[4]
  i1176.m_UnitsPerEM = i1177[5]
  i1176.m_LineHeight = i1177[6]
  i1176.m_AscentLine = i1177[7]
  i1176.m_CapLine = i1177[8]
  i1176.m_MeanLine = i1177[9]
  i1176.m_Baseline = i1177[10]
  i1176.m_DescentLine = i1177[11]
  i1176.m_SuperscriptOffset = i1177[12]
  i1176.m_SuperscriptSize = i1177[13]
  i1176.m_SubscriptOffset = i1177[14]
  i1176.m_SubscriptSize = i1177[15]
  i1176.m_UnderlineOffset = i1177[16]
  i1176.m_UnderlineThickness = i1177[17]
  i1176.m_StrikethroughOffset = i1177[18]
  i1176.m_StrikethroughThickness = i1177[19]
  i1176.m_TabWidth = i1177[20]
  return i1176
}

Deserializers["EquipmentSetData"] = function (request, data, root) {
  var i1178 = root || request.c( 'EquipmentSetData' )
  var i1179 = data
  request.r(i1179[0], i1179[1], 0, i1178, 'targetSkeletonDataAsset')
  var i1181 = i1179[2]
  var i1180 = new (System.Collections.Generic.List$1(Bridge.ns('System.String')))
  for(var i = 0; i < i1181.length; i += 1) {
    i1180.add(i1181[i + 0]);
  }
  i1178.skinNames = i1180
  return i1178
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i1182 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i1183 = data
  i1182.useSafeMode = !!i1183[0]
  i1182.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i1183[1], i1182.safeModeOptions)
  i1182.timeScale = i1183[2]
  i1182.unscaledTimeScale = i1183[3]
  i1182.useSmoothDeltaTime = !!i1183[4]
  i1182.maxSmoothUnscaledTime = i1183[5]
  i1182.rewindCallbackMode = i1183[6]
  i1182.showUnityEditorReport = !!i1183[7]
  i1182.logBehaviour = i1183[8]
  i1182.drawGizmos = !!i1183[9]
  i1182.defaultRecyclable = !!i1183[10]
  i1182.defaultAutoPlay = i1183[11]
  i1182.defaultUpdateType = i1183[12]
  i1182.defaultTimeScaleIndependent = !!i1183[13]
  i1182.defaultEaseType = i1183[14]
  i1182.defaultEaseOvershootOrAmplitude = i1183[15]
  i1182.defaultEasePeriod = i1183[16]
  i1182.defaultAutoKill = !!i1183[17]
  i1182.defaultLoopType = i1183[18]
  i1182.debugMode = !!i1183[19]
  i1182.debugStoreTargetId = !!i1183[20]
  i1182.showPreviewPanel = !!i1183[21]
  i1182.storeSettingsLocation = i1183[22]
  i1182.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i1183[23], i1182.modules)
  i1182.createASMDEF = !!i1183[24]
  i1182.showPlayingTweens = !!i1183[25]
  i1182.showPausedTweens = !!i1183[26]
  return i1182
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i1184 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i1185 = data
  i1184.logBehaviour = i1185[0]
  i1184.nestedTweenFailureBehaviour = i1185[1]
  return i1184
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i1186 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i1187 = data
  i1186.showPanel = !!i1187[0]
  i1186.audioEnabled = !!i1187[1]
  i1186.physicsEnabled = !!i1187[2]
  i1186.physics2DEnabled = !!i1187[3]
  i1186.spriteEnabled = !!i1187[4]
  i1186.uiEnabled = !!i1187[5]
  i1186.uiToolkitEnabled = !!i1187[6]
  i1186.textMeshProEnabled = !!i1187[7]
  i1186.tk2DEnabled = !!i1187[8]
  i1186.deAudioEnabled = !!i1187[9]
  i1186.deUnityExtendedEnabled = !!i1187[10]
  i1186.epoOutlineEnabled = !!i1187[11]
  return i1186
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i1188 = root || request.c( 'TMPro.TMP_Settings' )
  var i1189 = data
  i1188.assetVersion = i1189[0]
  i1188.m_TextWrappingMode = i1189[1]
  i1188.m_enableKerning = !!i1189[2]
  var i1191 = i1189[3]
  var i1190 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i1191.length; i += 1) {
    i1190.add(i1191[i + 0]);
  }
  i1188.m_ActiveFontFeatures = i1190
  i1188.m_enableExtraPadding = !!i1189[4]
  i1188.m_enableTintAllSprites = !!i1189[5]
  i1188.m_enableParseEscapeCharacters = !!i1189[6]
  i1188.m_EnableRaycastTarget = !!i1189[7]
  i1188.m_GetFontFeaturesAtRuntime = !!i1189[8]
  i1188.m_missingGlyphCharacter = i1189[9]
  i1188.m_ClearDynamicDataOnBuild = !!i1189[10]
  i1188.m_warningsDisabled = !!i1189[11]
  request.r(i1189[12], i1189[13], 0, i1188, 'm_defaultFontAsset')
  i1188.m_defaultFontAssetPath = i1189[14]
  i1188.m_defaultFontSize = i1189[15]
  i1188.m_defaultAutoSizeMinRatio = i1189[16]
  i1188.m_defaultAutoSizeMaxRatio = i1189[17]
  i1188.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i1189[18], i1189[19] )
  i1188.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i1189[20], i1189[21] )
  i1188.m_autoSizeTextContainer = !!i1189[22]
  i1188.m_IsTextObjectScaleStatic = !!i1189[23]
  var i1193 = i1189[24]
  var i1192 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1193.length; i += 2) {
  request.r(i1193[i + 0], i1193[i + 1], 1, i1192, '')
  }
  i1188.m_fallbackFontAssets = i1192
  i1188.m_matchMaterialPreset = !!i1189[25]
  i1188.m_HideSubTextObjects = !!i1189[26]
  request.r(i1189[27], i1189[28], 0, i1188, 'm_defaultSpriteAsset')
  i1188.m_defaultSpriteAssetPath = i1189[29]
  i1188.m_enableEmojiSupport = !!i1189[30]
  i1188.m_MissingCharacterSpriteUnicode = i1189[31]
  var i1195 = i1189[32]
  var i1194 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i1195.length; i += 2) {
  request.r(i1195[i + 0], i1195[i + 1], 1, i1194, '')
  }
  i1188.m_EmojiFallbackTextAssets = i1194
  i1188.m_defaultColorGradientPresetsPath = i1189[33]
  request.r(i1189[34], i1189[35], 0, i1188, 'm_defaultStyleSheet')
  i1188.m_StyleSheetsResourcePath = i1189[36]
  request.r(i1189[37], i1189[38], 0, i1188, 'm_leadingCharacters')
  request.r(i1189[39], i1189[40], 0, i1188, 'm_followingCharacters')
  i1188.m_UseModernHangulLineBreakingRules = !!i1189[41]
  return i1188
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i1198 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i1199 = data
  request.r(i1199[0], i1199[1], 0, i1198, 'spriteSheet')
  var i1201 = i1199[2]
  var i1200 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i1201.length; i += 1) {
    i1200.add(request.d('TMPro.TMP_Sprite', i1201[i + 0]));
  }
  i1198.spriteInfoList = i1200
  var i1203 = i1199[3]
  var i1202 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i1203.length; i += 2) {
  request.r(i1203[i + 0], i1203[i + 1], 1, i1202, '')
  }
  i1198.fallbackSpriteAssets = i1202
  var i1205 = i1199[4]
  var i1204 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i1205.length; i += 1) {
    i1204.add(request.d('TMPro.TMP_SpriteCharacter', i1205[i + 0]));
  }
  i1198.m_SpriteCharacterTable = i1204
  var i1207 = i1199[5]
  var i1206 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i1207.length; i += 1) {
    i1206.add(request.d('TMPro.TMP_SpriteGlyph', i1207[i + 0]));
  }
  i1198.m_GlyphTable = i1206
  i1198.m_Version = i1199[6]
  i1198.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i1199[7], i1198.m_FaceInfo)
  request.r(i1199[8], i1199[9], 0, i1198, 'm_Material')
  return i1198
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i1210 = root || request.c( 'TMPro.TMP_Sprite' )
  var i1211 = data
  i1210.name = i1211[0]
  i1210.hashCode = i1211[1]
  i1210.unicode = i1211[2]
  i1210.pivot = new pc.Vec2( i1211[3], i1211[4] )
  request.r(i1211[5], i1211[6], 0, i1210, 'sprite')
  i1210.id = i1211[7]
  i1210.x = i1211[8]
  i1210.y = i1211[9]
  i1210.width = i1211[10]
  i1210.height = i1211[11]
  i1210.xOffset = i1211[12]
  i1210.yOffset = i1211[13]
  i1210.xAdvance = i1211[14]
  i1210.scale = i1211[15]
  return i1210
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i1216 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i1217 = data
  i1216.m_Name = i1217[0]
  i1216.m_ElementType = i1217[1]
  i1216.m_Unicode = i1217[2]
  i1216.m_GlyphIndex = i1217[3]
  i1216.m_Scale = i1217[4]
  return i1216
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i1220 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i1221 = data
  request.r(i1221[0], i1221[1], 0, i1220, 'sprite')
  i1220.m_Index = i1221[2]
  i1220.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i1221[3], i1220.m_Metrics)
  i1220.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i1221[4], i1220.m_GlyphRect)
  i1220.m_Scale = i1221[5]
  i1220.m_AtlasIndex = i1221[6]
  i1220.m_ClassDefinitionType = i1221[7]
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

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"useSimplification":2,"useUInt32IndexFormat":3,"vertexCount":4,"aabb":5,"streams":6,"vertices":7,"subMeshes":8,"bindposes":9,"blendShapes":10},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Components.Transform":{"position":0,"scale":3,"rotation":6},"Luna.Unity.DTO.UnityEngine.Components.Animator":{"animatorController":0,"avatar":2,"updateMode":4,"hasTransformHierarchy":5,"applyRootMotion":6,"humanBones":7,"enabled":8},"Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer":{"color":0,"sprite":4,"flipX":6,"flipY":7,"drawMode":8,"size":9,"tileMode":11,"adaptiveModeThreshold":12,"maskInteraction":13,"spriteSortPoint":14,"enabled":15,"sharedMaterial":16,"sharedMaterials":18,"receiveShadows":19,"shadowCastingMode":20,"sortingLayerID":21,"sortingOrder":22,"lightmapIndex":23,"lightmapSceneIndex":24,"lightmapScaleOffset":25,"lightProbeUsage":29,"reflectionProbeUsage":30},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider":{"center":0,"radius":3,"height":4,"direction":5,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"referenceAmbientProbe":36,"useReferenceAmbientProbe":37,"customReflection":38,"defaultReflection":40,"defaultReflectionMode":42,"defaultReflectionResolution":43,"sunLightObjectId":44,"pixelLightCount":45,"defaultReflectionHDR":46,"hasLightDataAsset":47,"hasManualGenerate":48},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip":{"name":0,"wrapMode":1,"isLooping":2,"length":3,"curves":4,"events":5,"halfPrecision":6,"_frameRate":7,"localBounds":8,"hasMuscleCurves":9,"clipMuscleConstant":10,"clipBindingConstant":11},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve":{"path":0,"hash":1,"componentType":2,"property":3,"keys":4,"objectReferenceKeys":5},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey":{"time":0,"value":1},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent":{"functionName":0,"floatParameter":1,"intParameter":2,"stringParameter":3,"objectReferenceParameter":4,"time":6},"Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds":{"center":0,"extends":3},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant":{"genericBindings":0,"pptrCurveMapping":1},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController":{"name":0,"layers":1,"parameters":2,"animationClips":3,"avatarUnsupported":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer":{"name":0,"defaultWeight":1,"blendingMode":2,"avatarMask":3,"syncedLayerIndex":4,"syncedLayerAffectsTiming":5,"syncedLayers":6,"stateMachine":7},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine":{"id":0,"name":1,"path":2,"states":3,"machines":4,"entryStateTransitions":5,"exitStateTransitions":6,"anyStateTransitions":7,"defaultStateId":8},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState":{"id":0,"name":1,"cycleOffset":2,"cycleOffsetParameter":3,"cycleOffsetParameterActive":4,"mirror":5,"mirrorParameter":6,"mirrorParameterActive":7,"motionId":8,"nameHash":9,"fullPathHash":10,"speed":11,"speedParameter":12,"speedParameterActive":13,"tag":14,"tagHash":15,"writeDefaultValues":16,"behaviours":17,"transitions":18},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition":{"fullPath":0,"canTransitionToSelf":1,"duration":2,"exitTime":3,"hasExitTime":4,"hasFixedDuration":5,"interruptionSource":6,"offset":7,"orderedInterruption":8,"destinationStateId":9,"isExit":10,"mute":11,"solo":12,"conditions":13},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition":{"destinationStateId":0,"isExit":1,"mute":2,"solo":3,"conditions":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter":{"defaultBool":0,"defaultFloat":1,"defaultInt":2,"name":3,"nameHash":4,"type":5},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"lightmapEncodingQuality":11,"desiredColorSpace":12,"allTags":13},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition":{"mode":0,"parameter":1,"threshold":2}}

Deserializers.requiredComponents = {"47":[48],"49":[48],"50":[48],"51":[48],"52":[48],"53":[48],"54":[55],"56":[8],"57":[58],"59":[58],"60":[58],"61":[58],"62":[58],"63":[58],"64":[65],"66":[65],"67":[65],"68":[65],"69":[65],"70":[65],"71":[65],"72":[65],"73":[65],"74":[65],"75":[65],"76":[65],"77":[65],"78":[8],"79":[32],"80":[81],"82":[81],"83":[34],"11":[8],"84":[85],"86":[34],"87":[88,34],"33":[32],"89":[88,34],"90":[3,32],"91":[32],"92":[32,30],"93":[58],"94":[65],"95":[85],"96":[97],"98":[5],"99":[8],"100":[101],"102":[38],"103":[83],"104":[34],"36":[32,34],"105":[34,88],"106":[34],"107":[88,34],"108":[32],"109":[88,34],"110":[34],"111":[112],"113":[112],"114":[112],"115":[34],"116":[34],"117":[83],"118":[88,34],"119":[34],"120":[83],"121":[34],"122":[34],"123":[34],"124":[34],"125":[34],"126":[34],"127":[34],"128":[34],"129":[34],"130":[88,34],"131":[34],"132":[34],"133":[34],"134":[34],"135":[88,34],"136":[34],"137":[38],"138":[38],"39":[38],"139":[38],"140":[8],"141":[8]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Texture2D","UnityEngine.Transform","UnityEngine.Animator","UnityEditor.Animations.AnimatorController","UnityEngine.SpriteRenderer","UnityEngine.Sprite","UnityEngine.Material","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.MonoBehaviour","AutoCameraFit","CharacterManager","Character","EquipmentSetData","Spine.Unity.SkeletonDataAsset","GameManager","SlotManager","SlotSetup","UnityEngine.GameObject","Ply_Pool","Ply_SoundManager","UnityEngine.AudioClip","UnityEngine.AudioSource","ProgressTrackingManager","UnityEngine.CapsuleCollider","BalloonController","BalloonActionTrigger","SlotDataSO","ScreenHeightPositionAnchor","UnityEngine.MeshFilter","UnityEngine.Mesh","UnityEngine.MeshRenderer","Spine.Unity.SkeletonAnimation","UnityEngine.RectTransform","UnityEngine.EventSystems.UIBehaviour","TMPro.TextMeshPro","TMPro.TMP_FontAsset","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","Spine.Unity.SpineAtlasAsset","UnityEngine.TextAsset","UnityEngine.Font","DG.Tweening.Core.DOTweenSettings","TMPro.TMP_Settings","TMPro.TMP_SpriteAsset","TMPro.TMP_StyleSheet","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.SkinnedMeshRenderer","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.Canvas","Spine.Unity.EditorSkeletonPlayer","Spine.Unity.ISkeletonAnimation","Spine.Unity.BoneFollowerGraphic","Spine.Unity.SkeletonSubmeshGraphic","UnityEngine.CanvasRenderer","Spine.Unity.SkeletonGraphic","Spine.Unity.SkeletonMecanim","Spine.Unity.SkeletonRenderer","Spine.Unity.SkeletonPartsRenderer","Spine.Unity.FollowLocationRigidbody","Spine.Unity.FollowLocationRigidbody2D","Spine.Unity.SkeletonUtility","Spine.Unity.SkeletonUtilityConstraint","Spine.Unity.SkeletonUtilityBone","UnityEngine.U2D.Animation.SpriteSkin","UnityEngine.U2D.PixelPerfectCamera","UnityEngine.U2D.SpriteShapeController","UnityEngine.U2D.SpriteShapeRenderer","UnityEngine.InputSystem.UI.InputSystemUIInputModule","UnityEngine.InputSystem.UI.TrackedDeviceRaycaster","TMPro.TextContainer","TMPro.TextMeshProUGUI","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.GraphicRaycaster","UnityEngine.UI.Image","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.CanvasScaler","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.Mask","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.Scrollbar","UnityEngine.UI.ScrollRect","UnityEngine.UI.Slider","UnityEngine.UI.Text","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.38f1";

Deserializers.productName = "PLY_LeftOrRight";

Deserializers.lunaInitializationTime = "07/24/2026 10:13:04";

Deserializers.lunaDaysRunning = "3.6";

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

Deserializers.buildID = "33b52761-4069-4b5a-bd5b-b31b26e87381";

Deserializers.runtimeInitializeOnLoadInfos = [[["Unity","Services","Core","Internal","UnityServicesInitializer","EnableServicesInitializationAsync"],["UnityEngine","U2D","Animation","GpuDeformationSystem","CreateFallbackBuffer"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["DG","Tweening","DOTween","RuntimeOnLoad"],["Sirenix","Utilities","UnityVersion","EnsureLoaded"],["Sirenix","Serialization","Utilities","UnityVersion","EnsureLoaded"],["Sirenix","Serialization","UnitySerializationInitializer","InitializeRuntime"],["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["Unity","Services","Core","Registration","CorePackageInitializer","InitializeOnLoad"],["Unity","Services","Core","Internal","TaskAsyncOperation","SetScheduler"],["Unity","Services","Core","Environments","Client","Scheduler","EngineStateHelper","Init"],["Unity","Services","Core","Environments","Client","Scheduler","ThreadHelper","Init"],["Ua2CoreInitializeCallback","Register"],["UnityEngine","InputSystem","InputSystem","RunInitialUpdate"],["Unity","AI","Navigation","NavMeshLink","ClearTrackedList"],["Unity","AI","Navigation","NavMeshSurface","ClearNavMeshSurfaces"],["Unity","AI","Navigation","NavMeshModifierVolume","ClearNavMeshModifiers"],["Unity","AI","Navigation","NavMeshModifier","ClearNavMeshModifiers"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["Unity","Services","Core","Internal","UnityServicesInitializer","CreateStaticInstance"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"]],[["Unity","Services","Core","Environments","Client","Http","JsonHelpers","RegisterTypesForAOT"]],[["Unity","Services","Core","UnityThreadUtils","CaptureUnityThreadInfo"],["UnityEngine","InputSystem","Plugins","InputForUI","InputSystemProvider","Bootstrap"],["UnityEngine","InputSystem","InputSystem","RunInitializeInPlayer"],["Spine","Unity","AttachmentTools","AtlasUtilities","Init"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

