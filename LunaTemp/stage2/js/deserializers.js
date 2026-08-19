var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i654 = root || request.c( 'UnityEngine.JointSpring' )
  var i655 = data
  i654.spring = i655[0]
  i654.damper = i655[1]
  i654.targetPosition = i655[2]
  return i654
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i656 = root || request.c( 'UnityEngine.JointMotor' )
  var i657 = data
  i656.m_TargetVelocity = i657[0]
  i656.m_Force = i657[1]
  i656.m_FreeSpin = i657[2]
  return i656
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i658 = root || request.c( 'UnityEngine.JointLimits' )
  var i659 = data
  i658.m_Min = i659[0]
  i658.m_Max = i659[1]
  i658.m_Bounciness = i659[2]
  i658.m_BounceMinVelocity = i659[3]
  i658.m_ContactDistance = i659[4]
  i658.minBounce = i659[5]
  i658.maxBounce = i659[6]
  return i658
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i660 = root || request.c( 'UnityEngine.JointDrive' )
  var i661 = data
  i660.m_PositionSpring = i661[0]
  i660.m_PositionDamper = i661[1]
  i660.m_MaximumForce = i661[2]
  i660.m_UseAcceleration = i661[3]
  return i660
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i662 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i663 = data
  i662.m_Spring = i663[0]
  i662.m_Damper = i663[1]
  return i662
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i664 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i665 = data
  i664.m_Limit = i665[0]
  i664.m_Bounciness = i665[1]
  i664.m_ContactDistance = i665[2]
  return i664
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i666 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i667 = data
  i666.m_ExtremumSlip = i667[0]
  i666.m_ExtremumValue = i667[1]
  i666.m_AsymptoteSlip = i667[2]
  i666.m_AsymptoteValue = i667[3]
  i666.m_Stiffness = i667[4]
  return i666
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i668 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i669 = data
  i668.m_LowerAngle = i669[0]
  i668.m_UpperAngle = i669[1]
  return i668
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i670 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i671 = data
  i670.m_MotorSpeed = i671[0]
  i670.m_MaximumMotorTorque = i671[1]
  return i670
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i672 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i673 = data
  i672.m_DampingRatio = i673[0]
  i672.m_Frequency = i673[1]
  i672.m_Angle = i673[2]
  return i672
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i674 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i675 = data
  i674.m_LowerTranslation = i675[0]
  i674.m_UpperTranslation = i675[1]
  return i674
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i676 = root || new pc.UnityMaterial()
  var i677 = data
  i676.name = i677[0]
  request.r(i677[1], i677[2], 0, i676, 'shader')
  i676.renderQueue = i677[3]
  i676.enableInstancing = !!i677[4]
  var i679 = i677[5]
  var i678 = []
  for(var i = 0; i < i679.length; i += 1) {
    i678.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i679[i + 0]) );
  }
  i676.floatParameters = i678
  var i681 = i677[6]
  var i680 = []
  for(var i = 0; i < i681.length; i += 1) {
    i680.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i681[i + 0]) );
  }
  i676.colorParameters = i680
  var i683 = i677[7]
  var i682 = []
  for(var i = 0; i < i683.length; i += 1) {
    i682.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i683[i + 0]) );
  }
  i676.vectorParameters = i682
  var i685 = i677[8]
  var i684 = []
  for(var i = 0; i < i685.length; i += 1) {
    i684.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i685[i + 0]) );
  }
  i676.textureParameters = i684
  var i687 = i677[9]
  var i686 = []
  for(var i = 0; i < i687.length; i += 1) {
    i686.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i687[i + 0]) );
  }
  i676.materialFlags = i686
  return i676
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i690 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i691 = data
  i690.name = i691[0]
  i690.value = i691[1]
  return i690
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i694 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i695 = data
  i694.name = i695[0]
  i694.value = new pc.Color(i695[1], i695[2], i695[3], i695[4])
  return i694
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i698 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i699 = data
  i698.name = i699[0]
  i698.value = new pc.Vec4( i699[1], i699[2], i699[3], i699[4] )
  return i698
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i702 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i703 = data
  i702.name = i703[0]
  request.r(i703[1], i703[2], 0, i702, 'value')
  return i702
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i706 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i707 = data
  i706.name = i707[0]
  i706.enabled = !!i707[1]
  return i706
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i708 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i709 = data
  i708.name = i709[0]
  i708.width = i709[1]
  i708.height = i709[2]
  i708.mipmapCount = i709[3]
  i708.anisoLevel = i709[4]
  i708.filterMode = i709[5]
  i708.hdr = !!i709[6]
  i708.format = i709[7]
  i708.wrapMode = i709[8]
  i708.alphaIsTransparency = !!i709[9]
  i708.alphaSource = i709[10]
  i708.graphicsFormat = i709[11]
  i708.sRGBTexture = !!i709[12]
  i708.desiredColorSpace = i709[13]
  i708.wrapU = i709[14]
  i708.wrapV = i709[15]
  return i708
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i710 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i711 = data
  i710.name = i711[0]
  i710.halfPrecision = !!i711[1]
  i710.useSimplification = !!i711[2]
  i710.useUInt32IndexFormat = !!i711[3]
  i710.vertexCount = i711[4]
  i710.aabb = i711[5]
  var i713 = i711[6]
  var i712 = []
  for(var i = 0; i < i713.length; i += 1) {
    i712.push( !!i713[i + 0] );
  }
  i710.streams = i712
  i710.vertices = i711[7]
  var i715 = i711[8]
  var i714 = []
  for(var i = 0; i < i715.length; i += 1) {
    i714.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i715[i + 0]) );
  }
  i710.subMeshes = i714
  var i717 = i711[9]
  var i716 = []
  for(var i = 0; i < i717.length; i += 16) {
    i716.push( new pc.Mat4().setData(i717[i + 0], i717[i + 1], i717[i + 2], i717[i + 3],  i717[i + 4], i717[i + 5], i717[i + 6], i717[i + 7],  i717[i + 8], i717[i + 9], i717[i + 10], i717[i + 11],  i717[i + 12], i717[i + 13], i717[i + 14], i717[i + 15]) );
  }
  i710.bindposes = i716
  var i719 = i711[10]
  var i718 = []
  for(var i = 0; i < i719.length; i += 1) {
    i718.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i719[i + 0]) );
  }
  i710.blendShapes = i718
  return i710
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i724 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i725 = data
  i724.triangles = i725[0]
  return i724
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i730 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i731 = data
  i730.name = i731[0]
  var i733 = i731[1]
  var i732 = []
  for(var i = 0; i < i733.length; i += 1) {
    i732.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i733[i + 0]) );
  }
  i730.frames = i732
  return i730
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Transform"] = function (request, data, root) {
  var i734 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Transform' )
  var i735 = data
  i734.position = new pc.Vec3( i735[0], i735[1], i735[2] )
  i734.scale = new pc.Vec3( i735[3], i735[4], i735[5] )
  i734.rotation = new pc.Quat(i735[6], i735[7], i735[8], i735[9])
  return i734
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Animator"] = function (request, data, root) {
  var i736 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Animator' )
  var i737 = data
  request.r(i737[0], i737[1], 0, i736, 'animatorController')
  request.r(i737[2], i737[3], 0, i736, 'avatar')
  i736.updateMode = i737[4]
  i736.hasTransformHierarchy = !!i737[5]
  i736.applyRootMotion = !!i737[6]
  var i739 = i737[7]
  var i738 = []
  for(var i = 0; i < i739.length; i += 2) {
  request.r(i739[i + 0], i739[i + 1], 2, i738, '')
  }
  i736.humanBones = i738
  i736.enabled = !!i737[8]
  return i736
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer"] = function (request, data, root) {
  var i742 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer' )
  var i743 = data
  i742.color = new pc.Color(i743[0], i743[1], i743[2], i743[3])
  request.r(i743[4], i743[5], 0, i742, 'sprite')
  i742.flipX = !!i743[6]
  i742.flipY = !!i743[7]
  i742.drawMode = i743[8]
  i742.size = new pc.Vec2( i743[9], i743[10] )
  i742.tileMode = i743[11]
  i742.adaptiveModeThreshold = i743[12]
  i742.maskInteraction = i743[13]
  i742.spriteSortPoint = i743[14]
  i742.enabled = !!i743[15]
  request.r(i743[16], i743[17], 0, i742, 'sharedMaterial')
  var i745 = i743[18]
  var i744 = []
  for(var i = 0; i < i745.length; i += 2) {
  request.r(i745[i + 0], i745[i + 1], 2, i744, '')
  }
  i742.sharedMaterials = i744
  i742.receiveShadows = !!i743[19]
  i742.shadowCastingMode = i743[20]
  i742.sortingLayerID = i743[21]
  i742.sortingOrder = i743[22]
  i742.lightmapIndex = i743[23]
  i742.lightmapSceneIndex = i743[24]
  i742.lightmapScaleOffset = new pc.Vec4( i743[25], i743[26], i743[27], i743[28] )
  i742.lightProbeUsage = i743[29]
  i742.reflectionProbeUsage = i743[30]
  return i742
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i748 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i749 = data
  i748.name = i749[0]
  i748.tagId = i749[1]
  i748.enabled = !!i749[2]
  i748.isStatic = !!i749[3]
  i748.layer = i749[4]
  return i748
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i750 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i751 = data
  i750.name = i751[0]
  i750.index = i751[1]
  i750.startup = !!i751[2]
  return i750
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i752 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i753 = data
  i752.aspect = i753[0]
  i752.orthographic = !!i753[1]
  i752.orthographicSize = i753[2]
  i752.backgroundColor = new pc.Color(i753[3], i753[4], i753[5], i753[6])
  i752.nearClipPlane = i753[7]
  i752.farClipPlane = i753[8]
  i752.fieldOfView = i753[9]
  i752.depth = i753[10]
  i752.clearFlags = i753[11]
  i752.cullingMask = i753[12]
  i752.rect = i753[13]
  request.r(i753[14], i753[15], 0, i752, 'targetTexture')
  i752.usePhysicalProperties = !!i753[16]
  i752.focalLength = i753[17]
  i752.sensorSize = new pc.Vec2( i753[18], i753[19] )
  i752.lensShift = new pc.Vec2( i753[20], i753[21] )
  i752.gateFit = i753[22]
  i752.commandBufferCount = i753[23]
  i752.cameraType = i753[24]
  i752.enabled = !!i753[25]
  return i752
}

Deserializers["AutoCameraFit"] = function (request, data, root) {
  var i754 = root || request.c( 'AutoCameraFit' )
  var i755 = data
  request.r(i755[0], i755[1], 0, i754, 'tallScreenObject')
  i754.tallScreenRatioThreshold = i755[2]
  i754.tallScreenYOffset = i755[3]
  request.r(i755[4], i755[5], 0, i754, 'canvasBtn')
  request.r(i755[6], i755[7], 0, i754, 'targetArea')
  i754.paddingLandscape = i755[8]
  i754.paddingPortrait = i755[9]
  i754.extraPaddingSmallScreen = i755[10]
  i754.smallScreenThreshold = i755[11]
  i754.autoUpdateOnResize = !!i755[12]
  i754.adjustInEditMode = !!i755[13]
  return i754
}

Deserializers["CharacterManager"] = function (request, data, root) {
  var i756 = root || request.c( 'CharacterManager' )
  var i757 = data
  var i759 = i757[0]
  var i758 = new (System.Collections.Generic.List$1(Bridge.ns('CharacterEquipmentSetup')))
  for(var i = 0; i < i759.length; i += 1) {
    i758.add(request.d('CharacterEquipmentSetup', i759[i + 0]));
  }
  i756.characterSetups = i758
  request.r(i757[1], i757[2], 0, i756, 'character1')
  request.r(i757[3], i757[4], 0, i756, 'targetTestCharacter')
  request.r(i757[5], i757[6], 0, i756, 'testEquipmentDataAsset')
  var i761 = i757[7]
  var i760 = new (System.Collections.Generic.List$1(Bridge.ns('SkinToggleEntry')))
  for(var i = 0; i < i761.length; i += 1) {
    i760.add(request.d('SkinToggleEntry', i761[i + 0]));
  }
  i756.mySkinSet = i760
  var i763 = i757[8]
  var i762 = new (System.Collections.Generic.List$1(Bridge.ns('SlotAttachmentPair')))
  for(var i = 0; i < i763.length; i += 1) {
    i762.add(request.d('SlotAttachmentPair', i763[i + 0]));
  }
  i756.myAttachmentSet = i762
  i756.skinToSplit = i757[9]
  return i756
}

Deserializers["CharacterEquipmentSetup"] = function (request, data, root) {
  var i766 = root || request.c( 'CharacterEquipmentSetup' )
  var i767 = data
  request.r(i767[0], i767[1], 0, i766, 'character')
  request.r(i767[2], i767[3], 0, i766, 'equipmentData')
  return i766
}

Deserializers["SkinToggleEntry"] = function (request, data, root) {
  var i770 = root || request.c( 'SkinToggleEntry' )
  var i771 = data
  i770.isEnabled = !!i771[0]
  i770.skinName = i771[1]
  request.r(i771[2], i771[3], 0, i770, 'skeletonDataAsset')
  return i770
}

Deserializers["SlotAttachmentPair"] = function (request, data, root) {
  var i774 = root || request.c( 'SlotAttachmentPair' )
  var i775 = data
  i774.isEnabled = !!i775[0]
  i774.skinName = i775[1]
  i774.slotName = i775[2]
  i774.attachmentName = i775[3]
  request.r(i775[4], i775[5], 0, i774, 'skeletonDataAsset')
  request.r(i775[6], i775[7], 0, i774, 'customPreview')
  return i774
}

Deserializers["GameManager"] = function (request, data, root) {
  var i776 = root || request.c( 'GameManager' )
  var i777 = data
  i776.isGoogleBuild = !!i777[0]
  var i779 = i777[1]
  var i778 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.GameObject')))
  for(var i = 0; i < i779.length; i += 2) {
  request.r(i779[i + 0], i779[i + 1], 1, i778, '')
  }
  i776.googleDisabledObjects = i778
  var i781 = i777[2]
  var i780 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Behaviour')))
  for(var i = 0; i < i781.length; i += 2) {
  request.r(i781[i + 0], i781[i + 1], 1, i780, '')
  }
  i776.googleDisabledBehaviours = i780
  return i776
}

Deserializers["SlotManager"] = function (request, data, root) {
  var i786 = root || request.c( 'SlotManager' )
  var i787 = data
  var i789 = i787[0]
  var i788 = new (System.Collections.Generic.List$1(Bridge.ns('SlotSetup')))
  for(var i = 0; i < i789.length; i += 2) {
  request.r(i789[i + 0], i789[i + 1], 1, i788, '')
  }
  i786.allSlots = i788
  i786.maxSlotsToPlay = i787[1]
  request.r(i787[2], i787[3], 0, i786, 'objectToHideOnFirstClick')
  request.r(i787[4], i787[5], 0, i786, 'rightEffectPrefab')
  request.r(i787[6], i787[7], 0, i786, 'rightEffectSpawnPoint')
  var i791 = i787[8]
  var i790 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Sprite')))
  for(var i = 0; i < i791.length; i += 2) {
  request.r(i791[i + 0], i791[i + 1], 1, i790, '')
  }
  i786.rightEffectSprites = i790
  return i786
}

Deserializers["Ply_Pool"] = function (request, data, root) {
  var i796 = root || request.c( 'Ply_Pool' )
  var i797 = data
  var i799 = i797[0]
  var i798 = []
  for(var i = 0; i < i799.length; i += 1) {
    i798.push( request.d('Ply_Pool+PoolAmount', i799[i + 0]) );
  }
  i796.poolAmounts = i798
  return i796
}

Deserializers["Ply_Pool+PoolAmount"] = function (request, data, root) {
  var i802 = root || request.c( 'Ply_Pool+PoolAmount' )
  var i803 = data
  i802.type = i803[0]
  i802.amount = i803[1]
  request.r(i803[2], i803[3], 0, i802, 'gameUnit')
  return i802
}

Deserializers["Ply_SoundManager"] = function (request, data, root) {
  var i804 = root || request.c( 'Ply_SoundManager' )
  var i805 = data
  i804.fxAudio = request.d('FxAudio', i805[0], i804.fxAudio)
  request.r(i805[1], i805[2], 0, i804, 'bgm')
  return i804
}

Deserializers["FxAudio"] = function (request, data, root) {
  var i806 = root || request.c( 'FxAudio' )
  var i807 = data
  i806.Left = request.d('SoundData', i807[0], i806.Left)
  i806.Right = request.d('SoundData', i807[1], i806.Right)
  i806.Yeah = request.d('SoundData', i807[2], i806.Yeah)
  i806.Click = request.d('SoundData', i807[3], i806.Click)
  return i806
}

Deserializers["SoundData"] = function (request, data, root) {
  var i808 = root || request.c( 'SoundData' )
  var i809 = data
  request.r(i809[0], i809[1], 0, i808, 'clip')
  i808.repeatCount = i809[2]
  return i808
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i810 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i811 = data
  request.r(i811[0], i811[1], 0, i810, 'clip')
  request.r(i811[2], i811[3], 0, i810, 'outputAudioMixerGroup')
  i810.playOnAwake = !!i811[4]
  i810.loop = !!i811[5]
  i810.time = i811[6]
  i810.volume = i811[7]
  i810.pitch = i811[8]
  i810.enabled = !!i811[9]
  return i810
}

Deserializers["ProgressTrackingManager"] = function (request, data, root) {
  var i812 = root || request.c( 'ProgressTrackingManager' )
  var i813 = data
  i812.maxScore = i813[0]
  i812.currentScore = i813[1]
  i812.currentPercent = i813[2]
  return i812
}

Deserializers["ScreenHeightPositionAnchor"] = function (request, data, root) {
  var i814 = root || request.c( 'ScreenHeightPositionAnchor' )
  var i815 = data
  request.r(i815[0], i815[1], 0, i814, 'anchorPoint')
  request.r(i815[2], i815[3], 0, i814, 'targetCamera')
  i814.viewportYRatio = i815[4]
  i814.alignOnStart = !!i815[5]
  i814.alignOnEnable = !!i815[6]
  i814.alwaysUpdate = !!i815[7]
  i814.realignOnScreenSizeChanged = !!i815[8]
  i814.drawGizmos = !!i815[9]
  i814.targetLineColor = new pc.Color(i815[10], i815[11], i815[12], i815[13])
  i814.anchorColor = new pc.Color(i815[14], i815[15], i815[16], i815[17])
  return i814
}

Deserializers["SlotSetup"] = function (request, data, root) {
  var i816 = root || request.c( 'SlotSetup' )
  var i817 = data
  request.r(i817[0], i817[1], 0, i816, 'slotData')
  request.r(i817[2], i817[3], 0, i816, 'borderGold')
  request.r(i817[4], i817[5], 0, i816, 'borderWhite')
  request.r(i817[6], i817[7], 0, i816, 'greyCard')
  request.r(i817[8], i817[9], 0, i816, 'blueCard')
  request.r(i817[10], i817[11], 0, i816, 'greenCard')
  request.r(i817[12], i817[13], 0, i816, 'greenTick')
  request.r(i817[14], i817[15], 0, i816, 'leftBalloonObj')
  request.r(i817[16], i817[17], 0, i816, 'rightBalloonObj')
  request.r(i817[18], i817[19], 0, i816, 'leftBalloonItemRenderer')
  request.r(i817[20], i817[21], 0, i816, 'rightBalloonItemRenderer')
  return i816
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i818 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i819 = data
  i818.pivot = new pc.Vec2( i819[0], i819[1] )
  i818.anchorMin = new pc.Vec2( i819[2], i819[3] )
  i818.anchorMax = new pc.Vec2( i819[4], i819[5] )
  i818.sizeDelta = new pc.Vec2( i819[6], i819[7] )
  i818.anchoredPosition3D = new pc.Vec3( i819[8], i819[9], i819[10] )
  i818.rotation = new pc.Quat(i819[11], i819[12], i819[13], i819[14])
  i818.scale = new pc.Vec3( i819[15], i819[16], i819[17] )
  return i818
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i820 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i821 = data
  request.r(i821[0], i821[1], 0, i820, 'additionalVertexStreams')
  i820.enabled = !!i821[2]
  request.r(i821[3], i821[4], 0, i820, 'sharedMaterial')
  var i823 = i821[5]
  var i822 = []
  for(var i = 0; i < i823.length; i += 2) {
  request.r(i823[i + 0], i823[i + 1], 2, i822, '')
  }
  i820.sharedMaterials = i822
  i820.receiveShadows = !!i821[6]
  i820.shadowCastingMode = i821[7]
  i820.sortingLayerID = i821[8]
  i820.sortingOrder = i821[9]
  i820.lightmapIndex = i821[10]
  i820.lightmapSceneIndex = i821[11]
  i820.lightmapScaleOffset = new pc.Vec4( i821[12], i821[13], i821[14], i821[15] )
  i820.lightProbeUsage = i821[16]
  i820.reflectionProbeUsage = i821[17]
  return i820
}

Deserializers["TMPro.TextMeshPro"] = function (request, data, root) {
  var i824 = root || request.c( 'TMPro.TextMeshPro' )
  var i825 = data
  i824._SortingLayer = i825[0]
  i824._SortingLayerID = i825[1]
  i824._SortingOrder = i825[2]
  i824.m_hasFontAssetChanged = !!i825[3]
  request.r(i825[4], i825[5], 0, i824, 'm_renderer')
  i824.m_maskType = i825[6]
  i824.m_text = i825[7]
  i824.m_isRightToLeft = !!i825[8]
  request.r(i825[9], i825[10], 0, i824, 'm_fontAsset')
  request.r(i825[11], i825[12], 0, i824, 'm_sharedMaterial')
  var i827 = i825[13]
  var i826 = []
  for(var i = 0; i < i827.length; i += 2) {
  request.r(i827[i + 0], i827[i + 1], 2, i826, '')
  }
  i824.m_fontSharedMaterials = i826
  request.r(i825[14], i825[15], 0, i824, 'm_fontMaterial')
  var i829 = i825[16]
  var i828 = []
  for(var i = 0; i < i829.length; i += 2) {
  request.r(i829[i + 0], i829[i + 1], 2, i828, '')
  }
  i824.m_fontMaterials = i828
  i824.m_fontColor32 = UnityEngine.Color32.ConstructColor(i825[17], i825[18], i825[19], i825[20])
  i824.m_fontColor = new pc.Color(i825[21], i825[22], i825[23], i825[24])
  i824.m_enableVertexGradient = !!i825[25]
  i824.m_colorMode = i825[26]
  i824.m_fontColorGradient = request.d('TMPro.VertexGradient', i825[27], i824.m_fontColorGradient)
  request.r(i825[28], i825[29], 0, i824, 'm_fontColorGradientPreset')
  request.r(i825[30], i825[31], 0, i824, 'm_spriteAsset')
  i824.m_tintAllSprites = !!i825[32]
  request.r(i825[33], i825[34], 0, i824, 'm_StyleSheet')
  i824.m_TextStyleHashCode = i825[35]
  i824.m_overrideHtmlColors = !!i825[36]
  i824.m_faceColor = UnityEngine.Color32.ConstructColor(i825[37], i825[38], i825[39], i825[40])
  i824.m_fontSize = i825[41]
  i824.m_fontSizeBase = i825[42]
  i824.m_fontWeight = i825[43]
  i824.m_enableAutoSizing = !!i825[44]
  i824.m_fontSizeMin = i825[45]
  i824.m_fontSizeMax = i825[46]
  i824.m_fontStyle = i825[47]
  i824.m_HorizontalAlignment = i825[48]
  i824.m_VerticalAlignment = i825[49]
  i824.m_textAlignment = i825[50]
  i824.m_characterSpacing = i825[51]
  i824.m_wordSpacing = i825[52]
  i824.m_lineSpacing = i825[53]
  i824.m_lineSpacingMax = i825[54]
  i824.m_paragraphSpacing = i825[55]
  i824.m_charWidthMaxAdj = i825[56]
  i824.m_TextWrappingMode = i825[57]
  i824.m_wordWrappingRatios = i825[58]
  i824.m_overflowMode = i825[59]
  request.r(i825[60], i825[61], 0, i824, 'm_linkedTextComponent')
  request.r(i825[62], i825[63], 0, i824, 'parentLinkedComponent')
  i824.m_enableKerning = !!i825[64]
  var i831 = i825[65]
  var i830 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i831.length; i += 1) {
    i830.add(i831[i + 0]);
  }
  i824.m_ActiveFontFeatures = i830
  i824.m_enableExtraPadding = !!i825[66]
  i824.checkPaddingRequired = !!i825[67]
  i824.m_isRichText = !!i825[68]
  i824.m_parseCtrlCharacters = !!i825[69]
  i824.m_isOrthographic = !!i825[70]
  i824.m_isCullingEnabled = !!i825[71]
  i824.m_horizontalMapping = i825[72]
  i824.m_verticalMapping = i825[73]
  i824.m_uvLineOffset = i825[74]
  i824.m_geometrySortingOrder = i825[75]
  i824.m_IsTextObjectScaleStatic = !!i825[76]
  i824.m_VertexBufferAutoSizeReduction = !!i825[77]
  i824.m_useMaxVisibleDescender = !!i825[78]
  i824.m_pageToDisplay = i825[79]
  i824.m_margin = new pc.Vec4( i825[80], i825[81], i825[82], i825[83] )
  i824.m_isUsingLegacyAnimationComponent = !!i825[84]
  i824.m_isVolumetricText = !!i825[85]
  request.r(i825[86], i825[87], 0, i824, 'm_Material')
  i824.m_EmojiFallbackSupport = !!i825[88]
  i824.m_Maskable = !!i825[89]
  i824.m_Color = new pc.Color(i825[90], i825[91], i825[92], i825[93])
  i824.m_RaycastTarget = !!i825[94]
  i824.m_RaycastPadding = new pc.Vec4( i825[95], i825[96], i825[97], i825[98] )
  return i824
}

Deserializers["TMPro.VertexGradient"] = function (request, data, root) {
  var i832 = root || request.c( 'TMPro.VertexGradient' )
  var i833 = data
  i832.topLeft = new pc.Color(i833[0], i833[1], i833[2], i833[3])
  i832.topRight = new pc.Color(i833[4], i833[5], i833[6], i833[7])
  i832.bottomLeft = new pc.Color(i833[8], i833[9], i833[10], i833[11])
  i832.bottomRight = new pc.Color(i833[12], i833[13], i833[14], i833[15])
  return i832
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i836 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i837 = data
  request.r(i837[0], i837[1], 0, i836, 'sharedMesh')
  return i836
}

Deserializers["Spine.Unity.SkeletonAnimation"] = function (request, data, root) {
  var i838 = root || request.c( 'Spine.Unity.SkeletonAnimation' )
  var i839 = data
  i838.loop = !!i839[0]
  i838.timeScale = i839[1]
  request.r(i839[2], i839[3], 0, i838, 'skeletonDataAsset')
  i838.initialSkinName = i839[4]
  i838.fixPrefabOverrideViaMeshFilter = i839[5]
  i838.initialFlipX = !!i839[6]
  i838.initialFlipY = !!i839[7]
  i838.updateWhenInvisible = i839[8]
  i838.zSpacing = i839[9]
  i838.useClipping = !!i839[10]
  i838.immutableTriangles = !!i839[11]
  i838.pmaVertexColors = !!i839[12]
  i838.clearStateOnDisable = !!i839[13]
  i838.tintBlack = !!i839[14]
  i838.singleSubmesh = !!i839[15]
  i838.fixDrawOrder = !!i839[16]
  i838.addNormals = !!i839[17]
  i838.calculateTangents = !!i839[18]
  i838.maskInteraction = i839[19]
  i838.maskMaterials = request.d('Spine.Unity.SkeletonRenderer+SpriteMaskInteractionMaterials', i839[20], i838.maskMaterials)
  i838.disableRenderingOnOverride = !!i839[21]
  i838.updateTiming = i839[22]
  i838.unscaledTime = !!i839[23]
  i838._animationName = i839[24]
  var i841 = i839[25]
  var i840 = []
  for(var i = 0; i < i841.length; i += 1) {
    i840.push( i841[i + 0] );
  }
  i838.separatorSlotNames = i840
  i838.physicsPositionInheritanceFactor = new pc.Vec2( i839[26], i839[27] )
  i838.physicsRotationInheritanceFactor = i839[28]
  request.r(i839[29], i839[30], 0, i838, 'physicsMovementRelativeTo')
  return i838
}

Deserializers["Spine.Unity.SkeletonRenderer+SpriteMaskInteractionMaterials"] = function (request, data, root) {
  var i842 = root || request.c( 'Spine.Unity.SkeletonRenderer+SpriteMaskInteractionMaterials' )
  var i843 = data
  var i845 = i843[0]
  var i844 = []
  for(var i = 0; i < i845.length; i += 2) {
  request.r(i845[i + 0], i845[i + 1], 2, i844, '')
  }
  i842.materialsMaskDisabled = i844
  var i847 = i843[1]
  var i846 = []
  for(var i = 0; i < i847.length; i += 2) {
  request.r(i847[i + 0], i847[i + 1], 2, i846, '')
  }
  i842.materialsInsideMask = i846
  var i849 = i843[2]
  var i848 = []
  for(var i = 0; i < i849.length; i += 2) {
  request.r(i849[i + 0], i849[i + 1], 2, i848, '')
  }
  i842.materialsOutsideMask = i848
  return i842
}

Deserializers["Character"] = function (request, data, root) {
  var i852 = root || request.c( 'Character' )
  var i853 = data
  var i855 = i853[0]
  var i854 = new (System.Collections.Generic.List$1(Bridge.ns('System.String')))
  for(var i = 0; i < i855.length; i += 1) {
    i854.add(i855[i + 0]);
  }
  i852.currentAppliedSkinNames = i854
  request.r(i853[1], i853[2], 0, i852, 'tf')
  request.r(i853[3], i853[4], 0, i852, 'skeletonAnimation')
  var i857 = i853[5]
  var i856 = new (System.Collections.Generic.List$1(Bridge.ns('SlotAttachmentPair')))
  for(var i = 0; i < i857.length; i += 1) {
    i856.add(request.d('SlotAttachmentPair', i857[i + 0]));
  }
  i852.currentAppliedPairs = i856
  return i852
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider"] = function (request, data, root) {
  var i860 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider' )
  var i861 = data
  i860.center = new pc.Vec3( i861[0], i861[1], i861[2] )
  i860.radius = i861[3]
  i860.height = i861[4]
  i860.direction = i861[5]
  i860.enabled = !!i861[6]
  i860.isTrigger = !!i861[7]
  request.r(i861[8], i861[9], 0, i860, 'material')
  return i860
}

Deserializers["BalloonController"] = function (request, data, root) {
  var i862 = root || request.c( 'BalloonController' )
  var i863 = data
  request.r(i863[0], i863[1], 0, i862, 'targetItem')
  i862.interactableLayer = UnityEngine.LayerMask.FromIntegerValue( i863[2] )
  i862.flyDuration = i863[3]
  i862.scaleDuration = i863[4]
  i862.delayBeforeNextSlot = i863[5]
  i862.onBalloonClicked = request.d('UnityEngine.Events.UnityEvent', i863[6], i862.onBalloonClicked)
  return i862
}

Deserializers["UnityEngine.Events.UnityEvent"] = function (request, data, root) {
  var i864 = root || request.c( 'UnityEngine.Events.UnityEvent' )
  var i865 = data
  i864.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i865[0], i864.m_PersistentCalls)
  return i864
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i866 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i867 = data
  var i869 = i867[0]
  var i868 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i869.length; i += 1) {
    i868.add(request.d('UnityEngine.Events.PersistentCall', i869[i + 0]));
  }
  i866.m_Calls = i868
  return i866
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i872 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i873 = data
  request.r(i873[0], i873[1], 0, i872, 'm_Target')
  i872.m_TargetAssemblyTypeName = i873[2]
  i872.m_MethodName = i873[3]
  i872.m_Mode = i873[4]
  i872.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i873[5], i872.m_Arguments)
  i872.m_CallState = i873[6]
  return i872
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i874 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i875 = data
  request.r(i875[0], i875[1], 0, i874, 'm_ObjectArgument')
  i874.m_ObjectArgumentAssemblyTypeName = i875[2]
  i874.m_IntArgument = i875[3]
  i874.m_FloatArgument = i875[4]
  i874.m_StringArgument = i875[5]
  i874.m_BoolArgument = !!i875[6]
  return i874
}

Deserializers["BalloonActionTrigger"] = function (request, data, root) {
  var i876 = root || request.c( 'BalloonActionTrigger' )
  var i877 = data
  request.r(i877[0], i877[1], 0, i876, 'targetCharacter')
  i876.animationTrack = i877[2]
  i876.animationName = i877[3]
  i876.clearOtherAnimations = !!i877[4]
  request.r(i877[5], i877[6], 0, i876, 'skeletonDataAsset')
  return i876
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i878 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i879 = data
  request.r(i879[0], i879[1], 0, i878, 'm_FirstSelected')
  i878.m_sendNavigationEvents = !!i879[2]
  i878.m_DragThreshold = i879[3]
  return i878
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i880 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i881 = data
  i880.m_HorizontalAxis = i881[0]
  i880.m_VerticalAxis = i881[1]
  i880.m_SubmitButton = i881[2]
  i880.m_CancelButton = i881[3]
  i880.m_InputActionsPerSecond = i881[4]
  i880.m_RepeatDelay = i881[5]
  i880.m_ForceModuleActive = !!i881[6]
  i880.m_SendPointerHoverToParent = !!i881[7]
  return i880
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i882 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i883 = data
  i882.ambientIntensity = i883[0]
  i882.reflectionIntensity = i883[1]
  i882.ambientMode = i883[2]
  i882.ambientLight = new pc.Color(i883[3], i883[4], i883[5], i883[6])
  i882.ambientSkyColor = new pc.Color(i883[7], i883[8], i883[9], i883[10])
  i882.ambientGroundColor = new pc.Color(i883[11], i883[12], i883[13], i883[14])
  i882.ambientEquatorColor = new pc.Color(i883[15], i883[16], i883[17], i883[18])
  i882.fogColor = new pc.Color(i883[19], i883[20], i883[21], i883[22])
  i882.fogEndDistance = i883[23]
  i882.fogStartDistance = i883[24]
  i882.fogDensity = i883[25]
  i882.fog = !!i883[26]
  request.r(i883[27], i883[28], 0, i882, 'skybox')
  i882.fogMode = i883[29]
  var i885 = i883[30]
  var i884 = []
  for(var i = 0; i < i885.length; i += 1) {
    i884.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i885[i + 0]) );
  }
  i882.lightmaps = i884
  i882.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i883[31], i882.lightProbes)
  i882.lightmapsMode = i883[32]
  i882.mixedBakeMode = i883[33]
  i882.environmentLightingMode = i883[34]
  i882.ambientProbe = new pc.SphericalHarmonicsL2(i883[35])
  i882.referenceAmbientProbe = new pc.SphericalHarmonicsL2(i883[36])
  i882.useReferenceAmbientProbe = !!i883[37]
  request.r(i883[38], i883[39], 0, i882, 'customReflection')
  request.r(i883[40], i883[41], 0, i882, 'defaultReflection')
  i882.defaultReflectionMode = i883[42]
  i882.defaultReflectionResolution = i883[43]
  i882.sunLightObjectId = i883[44]
  i882.pixelLightCount = i883[45]
  i882.defaultReflectionHDR = !!i883[46]
  i882.hasLightDataAsset = !!i883[47]
  i882.hasManualGenerate = !!i883[48]
  return i882
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i888 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i889 = data
  request.r(i889[0], i889[1], 0, i888, 'lightmapColor')
  request.r(i889[2], i889[3], 0, i888, 'lightmapDirection')
  request.r(i889[4], i889[5], 0, i888, 'shadowMask')
  return i888
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i890 = root || new UnityEngine.LightProbes()
  var i891 = data
  return i890
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i898 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i899 = data
  var i901 = i899[0]
  var i900 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i901.length; i += 1) {
    i900.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i901[i + 0]));
  }
  i898.ShaderCompilationErrors = i900
  i898.name = i899[1]
  i898.guid = i899[2]
  var i903 = i899[3]
  var i902 = []
  for(var i = 0; i < i903.length; i += 1) {
    i902.push( i903[i + 0] );
  }
  i898.shaderDefinedKeywords = i902
  var i905 = i899[4]
  var i904 = []
  for(var i = 0; i < i905.length; i += 1) {
    i904.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i905[i + 0]) );
  }
  i898.passes = i904
  var i907 = i899[5]
  var i906 = []
  for(var i = 0; i < i907.length; i += 1) {
    i906.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i907[i + 0]) );
  }
  i898.usePasses = i906
  var i909 = i899[6]
  var i908 = []
  for(var i = 0; i < i909.length; i += 1) {
    i908.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i909[i + 0]) );
  }
  i898.defaultParameterValues = i908
  request.r(i899[7], i899[8], 0, i898, 'unityFallbackShader')
  i898.readDepth = !!i899[9]
  i898.hasDepthOnlyPass = !!i899[10]
  i898.isCreatedByShaderGraph = !!i899[11]
  i898.disableBatching = !!i899[12]
  i898.compiled = !!i899[13]
  return i898
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i912 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i913 = data
  i912.shaderName = i913[0]
  i912.errorMessage = i913[1]
  return i912
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i916 = root || new pc.UnityShaderPass()
  var i917 = data
  i916.id = i917[0]
  i916.subShaderIndex = i917[1]
  i916.name = i917[2]
  i916.passType = i917[3]
  i916.grabPassTextureName = i917[4]
  i916.usePass = !!i917[5]
  i916.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i917[6], i916.zTest)
  i916.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i917[7], i916.zWrite)
  i916.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i917[8], i916.culling)
  i916.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i917[9], i916.blending)
  i916.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i917[10], i916.alphaBlending)
  i916.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i917[11], i916.colorWriteMask)
  i916.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i917[12], i916.offsetUnits)
  i916.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i917[13], i916.offsetFactor)
  i916.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i917[14], i916.stencilRef)
  i916.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i917[15], i916.stencilReadMask)
  i916.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i917[16], i916.stencilWriteMask)
  i916.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i917[17], i916.stencilOp)
  i916.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i917[18], i916.stencilOpFront)
  i916.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i917[19], i916.stencilOpBack)
  var i919 = i917[20]
  var i918 = []
  for(var i = 0; i < i919.length; i += 1) {
    i918.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i919[i + 0]) );
  }
  i916.tags = i918
  var i921 = i917[21]
  var i920 = []
  for(var i = 0; i < i921.length; i += 1) {
    i920.push( i921[i + 0] );
  }
  i916.passDefinedKeywords = i920
  var i923 = i917[22]
  var i922 = []
  for(var i = 0; i < i923.length; i += 1) {
    i922.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i923[i + 0]) );
  }
  i916.passDefinedKeywordGroups = i922
  var i925 = i917[23]
  var i924 = []
  for(var i = 0; i < i925.length; i += 1) {
    i924.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i925[i + 0]) );
  }
  i916.variants = i924
  var i927 = i917[24]
  var i926 = []
  for(var i = 0; i < i927.length; i += 1) {
    i926.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i927[i + 0]) );
  }
  i916.excludedVariants = i926
  i916.hasDepthReader = !!i917[25]
  return i916
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i928 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i929 = data
  i928.val = i929[0]
  i928.name = i929[1]
  return i928
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i930 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i931 = data
  i930.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i931[0], i930.src)
  i930.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i931[1], i930.dst)
  i930.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i931[2], i930.op)
  return i930
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i932 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i933 = data
  i932.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i933[0], i932.pass)
  i932.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i933[1], i932.fail)
  i932.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i933[2], i932.zFail)
  i932.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i933[3], i932.comp)
  return i932
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i936 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i937 = data
  i936.name = i937[0]
  i936.value = i937[1]
  return i936
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i940 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i941 = data
  var i943 = i941[0]
  var i942 = []
  for(var i = 0; i < i943.length; i += 1) {
    i942.push( i943[i + 0] );
  }
  i940.keywords = i942
  i940.hasDiscard = !!i941[1]
  return i940
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i946 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i947 = data
  i946.passId = i947[0]
  i946.subShaderIndex = i947[1]
  var i949 = i947[2]
  var i948 = []
  for(var i = 0; i < i949.length; i += 1) {
    i948.push( i949[i + 0] );
  }
  i946.keywords = i948
  i946.vertexProgram = i947[3]
  i946.fragmentProgram = i947[4]
  i946.exportedForWebGl2 = !!i947[5]
  i946.readDepth = !!i947[6]
  return i946
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i952 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i953 = data
  request.r(i953[0], i953[1], 0, i952, 'shader')
  i952.pass = i953[2]
  return i952
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i956 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i957 = data
  i956.name = i957[0]
  i956.type = i957[1]
  i956.value = new pc.Vec4( i957[2], i957[3], i957[4], i957[5] )
  i956.textureValue = i957[6]
  i956.shaderPropertyFlag = i957[7]
  return i956
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i958 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i959 = data
  i958.name = i959[0]
  request.r(i959[1], i959[2], 0, i958, 'texture')
  i958.aabb = i959[3]
  i958.vertices = i959[4]
  i958.triangles = i959[5]
  i958.textureRect = UnityEngine.Rect.MinMaxRect(i959[6], i959[7], i959[8], i959[9])
  i958.packedRect = UnityEngine.Rect.MinMaxRect(i959[10], i959[11], i959[12], i959[13])
  i958.border = new pc.Vec4( i959[14], i959[15], i959[16], i959[17] )
  i958.transparency = i959[18]
  i958.bounds = i959[19]
  i958.pixelsPerUnit = i959[20]
  i958.textureWidth = i959[21]
  i958.textureHeight = i959[22]
  i958.nativeSize = new pc.Vec2( i959[23], i959[24] )
  i958.pivot = new pc.Vec2( i959[25], i959[26] )
  i958.textureRectOffset = new pc.Vec2( i959[27], i959[28] )
  return i958
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i960 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i961 = data
  i960.name = i961[0]
  return i960
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip"] = function (request, data, root) {
  var i962 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip' )
  var i963 = data
  i962.name = i963[0]
  i962.wrapMode = i963[1]
  i962.isLooping = !!i963[2]
  i962.length = i963[3]
  var i965 = i963[4]
  var i964 = []
  for(var i = 0; i < i965.length; i += 1) {
    i964.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve', i965[i + 0]) );
  }
  i962.curves = i964
  var i967 = i963[5]
  var i966 = []
  for(var i = 0; i < i967.length; i += 1) {
    i966.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent', i967[i + 0]) );
  }
  i962.events = i966
  i962.halfPrecision = !!i963[6]
  i962._frameRate = i963[7]
  i962.localBounds = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds', i963[8], i962.localBounds)
  i962.hasMuscleCurves = !!i963[9]
  var i969 = i963[10]
  var i968 = []
  for(var i = 0; i < i969.length; i += 1) {
    i968.push( i969[i + 0] );
  }
  i962.clipMuscleConstant = i968
  i962.clipBindingConstant = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant', i963[11], i962.clipBindingConstant)
  return i962
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve"] = function (request, data, root) {
  var i972 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve' )
  var i973 = data
  i972.path = i973[0]
  i972.hash = i973[1]
  i972.componentType = i973[2]
  i972.property = i973[3]
  i972.keys = i973[4]
  var i975 = i973[5]
  var i974 = []
  for(var i = 0; i < i975.length; i += 1) {
    i974.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey', i975[i + 0]) );
  }
  i972.objectReferenceKeys = i974
  return i972
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey"] = function (request, data, root) {
  var i978 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey' )
  var i979 = data
  i978.time = i979[0]
  request.r(i979[1], i979[2], 0, i978, 'value')
  return i978
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent"] = function (request, data, root) {
  var i982 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent' )
  var i983 = data
  i982.functionName = i983[0]
  i982.floatParameter = i983[1]
  i982.intParameter = i983[2]
  i982.stringParameter = i983[3]
  request.r(i983[4], i983[5], 0, i982, 'objectReferenceParameter')
  i982.time = i983[6]
  return i982
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds"] = function (request, data, root) {
  var i984 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds' )
  var i985 = data
  i984.center = new pc.Vec3( i985[0], i985[1], i985[2] )
  i984.extends = new pc.Vec3( i985[3], i985[4], i985[5] )
  return i984
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant"] = function (request, data, root) {
  var i988 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant' )
  var i989 = data
  var i991 = i989[0]
  var i990 = []
  for(var i = 0; i < i991.length; i += 1) {
    i990.push( i991[i + 0] );
  }
  i988.genericBindings = i990
  var i993 = i989[1]
  var i992 = []
  for(var i = 0; i < i993.length; i += 1) {
    i992.push( i993[i + 0] );
  }
  i988.pptrCurveMapping = i992
  return i988
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i994 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i995 = data
  i994.name = i995[0]
  i994.ascent = i995[1]
  i994.originalLineHeight = i995[2]
  i994.fontSize = i995[3]
  var i997 = i995[4]
  var i996 = []
  for(var i = 0; i < i997.length; i += 1) {
    i996.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i997[i + 0]) );
  }
  i994.characterInfo = i996
  request.r(i995[5], i995[6], 0, i994, 'texture')
  i994.originalFontSize = i995[7]
  return i994
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i1000 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i1001 = data
  i1000.index = i1001[0]
  i1000.advance = i1001[1]
  i1000.bearing = i1001[2]
  i1000.glyphWidth = i1001[3]
  i1000.glyphHeight = i1001[4]
  i1000.minX = i1001[5]
  i1000.maxX = i1001[6]
  i1000.minY = i1001[7]
  i1000.maxY = i1001[8]
  i1000.uvBottomLeftX = i1001[9]
  i1000.uvBottomLeftY = i1001[10]
  i1000.uvBottomRightX = i1001[11]
  i1000.uvBottomRightY = i1001[12]
  i1000.uvTopLeftX = i1001[13]
  i1000.uvTopLeftY = i1001[14]
  i1000.uvTopRightX = i1001[15]
  i1000.uvTopRightY = i1001[16]
  return i1000
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController"] = function (request, data, root) {
  var i1002 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController' )
  var i1003 = data
  i1002.name = i1003[0]
  var i1005 = i1003[1]
  var i1004 = []
  for(var i = 0; i < i1005.length; i += 1) {
    i1004.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer', i1005[i + 0]) );
  }
  i1002.layers = i1004
  var i1007 = i1003[2]
  var i1006 = []
  for(var i = 0; i < i1007.length; i += 1) {
    i1006.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter', i1007[i + 0]) );
  }
  i1002.parameters = i1006
  i1002.animationClips = i1003[3]
  i1002.avatarUnsupported = i1003[4]
  return i1002
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer"] = function (request, data, root) {
  var i1010 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer' )
  var i1011 = data
  i1010.name = i1011[0]
  i1010.defaultWeight = i1011[1]
  i1010.blendingMode = i1011[2]
  i1010.avatarMask = i1011[3]
  i1010.syncedLayerIndex = i1011[4]
  i1010.syncedLayerAffectsTiming = !!i1011[5]
  i1010.syncedLayers = i1011[6]
  i1010.stateMachine = request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i1011[7], i1010.stateMachine)
  return i1010
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine"] = function (request, data, root) {
  var i1012 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine' )
  var i1013 = data
  i1012.id = i1013[0]
  i1012.name = i1013[1]
  i1012.path = i1013[2]
  var i1015 = i1013[3]
  var i1014 = []
  for(var i = 0; i < i1015.length; i += 1) {
    i1014.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState', i1015[i + 0]) );
  }
  i1012.states = i1014
  var i1017 = i1013[4]
  var i1016 = []
  for(var i = 0; i < i1017.length; i += 1) {
    i1016.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i1017[i + 0]) );
  }
  i1012.machines = i1016
  var i1019 = i1013[5]
  var i1018 = []
  for(var i = 0; i < i1019.length; i += 1) {
    i1018.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i1019[i + 0]) );
  }
  i1012.entryStateTransitions = i1018
  var i1021 = i1013[6]
  var i1020 = []
  for(var i = 0; i < i1021.length; i += 1) {
    i1020.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i1021[i + 0]) );
  }
  i1012.exitStateTransitions = i1020
  var i1023 = i1013[7]
  var i1022 = []
  for(var i = 0; i < i1023.length; i += 1) {
    i1022.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i1023[i + 0]) );
  }
  i1012.anyStateTransitions = i1022
  i1012.defaultStateId = i1013[8]
  return i1012
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState"] = function (request, data, root) {
  var i1026 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState' )
  var i1027 = data
  i1026.id = i1027[0]
  i1026.name = i1027[1]
  i1026.cycleOffset = i1027[2]
  i1026.cycleOffsetParameter = i1027[3]
  i1026.cycleOffsetParameterActive = !!i1027[4]
  i1026.mirror = !!i1027[5]
  i1026.mirrorParameter = i1027[6]
  i1026.mirrorParameterActive = !!i1027[7]
  i1026.motionId = i1027[8]
  i1026.nameHash = i1027[9]
  i1026.fullPathHash = i1027[10]
  i1026.speed = i1027[11]
  i1026.speedParameter = i1027[12]
  i1026.speedParameterActive = !!i1027[13]
  i1026.tag = i1027[14]
  i1026.tagHash = i1027[15]
  i1026.writeDefaultValues = !!i1027[16]
  var i1029 = i1027[17]
  var i1028 = []
  for(var i = 0; i < i1029.length; i += 2) {
  request.r(i1029[i + 0], i1029[i + 1], 2, i1028, '')
  }
  i1026.behaviours = i1028
  var i1031 = i1027[18]
  var i1030 = []
  for(var i = 0; i < i1031.length; i += 1) {
    i1030.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i1031[i + 0]) );
  }
  i1026.transitions = i1030
  return i1026
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition"] = function (request, data, root) {
  var i1036 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition' )
  var i1037 = data
  i1036.fullPath = i1037[0]
  i1036.canTransitionToSelf = !!i1037[1]
  i1036.duration = i1037[2]
  i1036.exitTime = i1037[3]
  i1036.hasExitTime = !!i1037[4]
  i1036.hasFixedDuration = !!i1037[5]
  i1036.interruptionSource = i1037[6]
  i1036.offset = i1037[7]
  i1036.orderedInterruption = !!i1037[8]
  i1036.destinationStateId = i1037[9]
  i1036.isExit = !!i1037[10]
  i1036.mute = !!i1037[11]
  i1036.solo = !!i1037[12]
  var i1039 = i1037[13]
  var i1038 = []
  for(var i = 0; i < i1039.length; i += 1) {
    i1038.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i1039[i + 0]) );
  }
  i1036.conditions = i1038
  return i1036
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition"] = function (request, data, root) {
  var i1044 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition' )
  var i1045 = data
  i1044.destinationStateId = i1045[0]
  i1044.isExit = !!i1045[1]
  i1044.mute = !!i1045[2]
  i1044.solo = !!i1045[3]
  var i1047 = i1045[4]
  var i1046 = []
  for(var i = 0; i < i1047.length; i += 1) {
    i1046.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i1047[i + 0]) );
  }
  i1044.conditions = i1046
  return i1044
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter"] = function (request, data, root) {
  var i1050 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter' )
  var i1051 = data
  i1050.defaultBool = !!i1051[0]
  i1050.defaultFloat = i1051[1]
  i1050.defaultInt = i1051[2]
  i1050.name = i1051[3]
  i1050.nameHash = i1051[4]
  i1050.type = i1051[5]
  return i1050
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i1052 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i1053 = data
  i1052.name = i1053[0]
  i1052.bytes64 = i1053[1]
  i1052.data = i1053[2]
  return i1052
}

Deserializers["SlotDataSO"] = function (request, data, root) {
  var i1054 = root || request.c( 'SlotDataSO' )
  var i1055 = data
  i1054.slotName = i1055[0]
  request.r(i1055[1], i1055[2], 0, i1054, 'leftItemSprite')
  request.r(i1055[3], i1055[4], 0, i1054, 'rightItemSprite')
  return i1054
}

Deserializers["Spine.Unity.SkeletonDataAsset"] = function (request, data, root) {
  var i1056 = root || request.c( 'Spine.Unity.SkeletonDataAsset' )
  var i1057 = data
  var i1059 = i1057[0]
  var i1058 = []
  for(var i = 0; i < i1059.length; i += 2) {
  request.r(i1059[i + 0], i1059[i + 1], 2, i1058, '')
  }
  i1056.atlasAssets = i1058
  i1056.scale = i1057[1]
  request.r(i1057[2], i1057[3], 0, i1056, 'skeletonJSON')
  i1056.isUpgradingBlendModeMaterials = !!i1057[4]
  i1056.blendModeMaterials = request.d('Spine.Unity.BlendModeMaterials', i1057[5], i1056.blendModeMaterials)
  var i1061 = i1057[6]
  var i1060 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.SkeletonDataModifierAsset')))
  for(var i = 0; i < i1061.length; i += 2) {
  request.r(i1061[i + 0], i1061[i + 1], 1, i1060, '')
  }
  i1056.skeletonDataModifiers = i1060
  var i1063 = i1057[7]
  var i1062 = []
  for(var i = 0; i < i1063.length; i += 1) {
    i1062.push( i1063[i + 0] );
  }
  i1056.fromAnimation = i1062
  var i1065 = i1057[8]
  var i1064 = []
  for(var i = 0; i < i1065.length; i += 1) {
    i1064.push( i1065[i + 0] );
  }
  i1056.toAnimation = i1064
  i1056.duration = i1057[9]
  i1056.defaultMix = i1057[10]
  request.r(i1057[11], i1057[12], 0, i1056, 'controller')
  return i1056
}

Deserializers["Spine.Unity.BlendModeMaterials"] = function (request, data, root) {
  var i1068 = root || request.c( 'Spine.Unity.BlendModeMaterials' )
  var i1069 = data
  i1068.applyAdditiveMaterial = !!i1069[0]
  var i1071 = i1069[1]
  var i1070 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.BlendModeMaterials+ReplacementMaterial')))
  for(var i = 0; i < i1071.length; i += 1) {
    i1070.add(request.d('Spine.Unity.BlendModeMaterials+ReplacementMaterial', i1071[i + 0]));
  }
  i1068.additiveMaterials = i1070
  var i1073 = i1069[2]
  var i1072 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.BlendModeMaterials+ReplacementMaterial')))
  for(var i = 0; i < i1073.length; i += 1) {
    i1072.add(request.d('Spine.Unity.BlendModeMaterials+ReplacementMaterial', i1073[i + 0]));
  }
  i1068.multiplyMaterials = i1072
  var i1075 = i1069[3]
  var i1074 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.BlendModeMaterials+ReplacementMaterial')))
  for(var i = 0; i < i1075.length; i += 1) {
    i1074.add(request.d('Spine.Unity.BlendModeMaterials+ReplacementMaterial', i1075[i + 0]));
  }
  i1068.screenMaterials = i1074
  i1068.requiresBlendModeMaterials = !!i1069[4]
  return i1068
}

Deserializers["Spine.Unity.BlendModeMaterials+ReplacementMaterial"] = function (request, data, root) {
  var i1078 = root || request.c( 'Spine.Unity.BlendModeMaterials+ReplacementMaterial' )
  var i1079 = data
  i1078.pageName = i1079[0]
  request.r(i1079[1], i1079[2], 0, i1078, 'material')
  return i1078
}

Deserializers["Spine.Unity.SpineAtlasAsset"] = function (request, data, root) {
  var i1082 = root || request.c( 'Spine.Unity.SpineAtlasAsset' )
  var i1083 = data
  request.r(i1083[0], i1083[1], 0, i1082, 'atlasFile')
  var i1085 = i1083[2]
  var i1084 = []
  for(var i = 0; i < i1085.length; i += 2) {
  request.r(i1085[i + 0], i1085[i + 1], 2, i1084, '')
  }
  i1082.materials = i1084
  i1082.textureLoadingMode = i1083[3]
  request.r(i1083[4], i1083[5], 0, i1082, 'onDemandTextureLoader')
  return i1082
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i1086 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i1087 = data
  i1086.normalStyle = i1087[0]
  i1086.normalSpacingOffset = i1087[1]
  i1086.boldStyle = i1087[2]
  i1086.boldSpacing = i1087[3]
  i1086.italicStyle = i1087[4]
  i1086.tabSize = i1087[5]
  request.r(i1087[6], i1087[7], 0, i1086, 'atlas')
  i1086.m_SourceFontFileGUID = i1087[8]
  i1086.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i1087[9], i1086.m_CreationSettings)
  request.r(i1087[10], i1087[11], 0, i1086, 'm_SourceFontFile')
  i1086.m_SourceFontFilePath = i1087[12]
  i1086.m_AtlasPopulationMode = i1087[13]
  i1086.InternalDynamicOS = !!i1087[14]
  var i1089 = i1087[15]
  var i1088 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i1089.length; i += 1) {
    i1088.add(request.d('UnityEngine.TextCore.Glyph', i1089[i + 0]));
  }
  i1086.m_GlyphTable = i1088
  var i1091 = i1087[16]
  var i1090 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i1091.length; i += 1) {
    i1090.add(request.d('TMPro.TMP_Character', i1091[i + 0]));
  }
  i1086.m_CharacterTable = i1090
  var i1093 = i1087[17]
  var i1092 = []
  for(var i = 0; i < i1093.length; i += 2) {
  request.r(i1093[i + 0], i1093[i + 1], 2, i1092, '')
  }
  i1086.m_AtlasTextures = i1092
  i1086.m_AtlasTextureIndex = i1087[18]
  i1086.m_IsMultiAtlasTexturesEnabled = !!i1087[19]
  i1086.m_GetFontFeatures = !!i1087[20]
  i1086.m_ClearDynamicDataOnBuild = !!i1087[21]
  i1086.m_AtlasWidth = i1087[22]
  i1086.m_AtlasHeight = i1087[23]
  i1086.m_AtlasPadding = i1087[24]
  i1086.m_AtlasRenderMode = i1087[25]
  var i1095 = i1087[26]
  var i1094 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i1095.length; i += 1) {
    i1094.add(request.d('UnityEngine.TextCore.GlyphRect', i1095[i + 0]));
  }
  i1086.m_UsedGlyphRects = i1094
  var i1097 = i1087[27]
  var i1096 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i1097.length; i += 1) {
    i1096.add(request.d('UnityEngine.TextCore.GlyphRect', i1097[i + 0]));
  }
  i1086.m_FreeGlyphRects = i1096
  i1086.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i1087[28], i1086.m_FontFeatureTable)
  i1086.m_ShouldReimportFontFeatures = !!i1087[29]
  var i1099 = i1087[30]
  var i1098 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1099.length; i += 2) {
  request.r(i1099[i + 0], i1099[i + 1], 1, i1098, '')
  }
  i1086.m_FallbackFontAssetTable = i1098
  var i1101 = i1087[31]
  var i1100 = []
  for(var i = 0; i < i1101.length; i += 1) {
    i1100.push( request.d('TMPro.TMP_FontWeightPair', i1101[i + 0]) );
  }
  i1086.m_FontWeightTable = i1100
  var i1103 = i1087[32]
  var i1102 = []
  for(var i = 0; i < i1103.length; i += 1) {
    i1102.push( request.d('TMPro.TMP_FontWeightPair', i1103[i + 0]) );
  }
  i1086.fontWeights = i1102
  i1086.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i1087[33], i1086.m_fontInfo)
  var i1105 = i1087[34]
  var i1104 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i1105.length; i += 1) {
    i1104.add(request.d('TMPro.TMP_Glyph', i1105[i + 0]));
  }
  i1086.m_glyphInfoList = i1104
  i1086.m_KerningTable = request.d('TMPro.KerningTable', i1087[35], i1086.m_KerningTable)
  var i1107 = i1087[36]
  var i1106 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1107.length; i += 2) {
  request.r(i1107[i + 0], i1107[i + 1], 1, i1106, '')
  }
  i1086.fallbackFontAssets = i1106
  i1086.m_Version = i1087[37]
  i1086.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i1087[38], i1086.m_FaceInfo)
  request.r(i1087[39], i1087[40], 0, i1086, 'm_Material')
  return i1086
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i1108 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i1109 = data
  i1108.sourceFontFileName = i1109[0]
  i1108.sourceFontFileGUID = i1109[1]
  i1108.faceIndex = i1109[2]
  i1108.pointSizeSamplingMode = i1109[3]
  i1108.pointSize = i1109[4]
  i1108.padding = i1109[5]
  i1108.paddingMode = i1109[6]
  i1108.packingMode = i1109[7]
  i1108.atlasWidth = i1109[8]
  i1108.atlasHeight = i1109[9]
  i1108.characterSetSelectionMode = i1109[10]
  i1108.characterSequence = i1109[11]
  i1108.referencedFontAssetGUID = i1109[12]
  i1108.referencedTextAssetGUID = i1109[13]
  i1108.fontStyle = i1109[14]
  i1108.fontStyleModifier = i1109[15]
  i1108.renderMode = i1109[16]
  i1108.includeFontFeatures = !!i1109[17]
  return i1108
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i1112 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i1113 = data
  i1112.m_Index = i1113[0]
  i1112.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i1113[1], i1112.m_Metrics)
  i1112.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i1113[2], i1112.m_GlyphRect)
  i1112.m_Scale = i1113[3]
  i1112.m_AtlasIndex = i1113[4]
  i1112.m_ClassDefinitionType = i1113[5]
  return i1112
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i1114 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i1115 = data
  i1114.m_Width = i1115[0]
  i1114.m_Height = i1115[1]
  i1114.m_HorizontalBearingX = i1115[2]
  i1114.m_HorizontalBearingY = i1115[3]
  i1114.m_HorizontalAdvance = i1115[4]
  return i1114
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

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i1120 = root || request.c( 'TMPro.TMP_Character' )
  var i1121 = data
  i1120.m_ElementType = i1121[0]
  i1120.m_Unicode = i1121[1]
  i1120.m_GlyphIndex = i1121[2]
  i1120.m_Scale = i1121[3]
  return i1120
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i1126 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i1127 = data
  var i1129 = i1127[0]
  var i1128 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i1129.length; i += 1) {
    i1128.add(request.d('TMPro.MultipleSubstitutionRecord', i1129[i + 0]));
  }
  i1126.m_MultipleSubstitutionRecords = i1128
  var i1131 = i1127[1]
  var i1130 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i1131.length; i += 1) {
    i1130.add(request.d('TMPro.LigatureSubstitutionRecord', i1131[i + 0]));
  }
  i1126.m_LigatureSubstitutionRecords = i1130
  var i1133 = i1127[2]
  var i1132 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i1133.length; i += 1) {
    i1132.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i1133[i + 0]));
  }
  i1126.m_GlyphPairAdjustmentRecords = i1132
  var i1135 = i1127[3]
  var i1134 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i1135.length; i += 1) {
    i1134.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i1135[i + 0]));
  }
  i1126.m_MarkToBaseAdjustmentRecords = i1134
  var i1137 = i1127[4]
  var i1136 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i1137.length; i += 1) {
    i1136.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i1137[i + 0]));
  }
  i1126.m_MarkToMarkAdjustmentRecords = i1136
  return i1126
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i1140 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i1141 = data
  i1140.m_TargetGlyphID = i1141[0]
  i1140.m_SubstituteGlyphIDs = i1141[1]
  return i1140
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i1144 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i1145 = data
  i1144.m_ComponentGlyphIDs = i1145[0]
  i1144.m_LigatureGlyphID = i1145[1]
  return i1144
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i1148 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i1149 = data
  i1148.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i1149[0], i1148.m_FirstAdjustmentRecord)
  i1148.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i1149[1], i1148.m_SecondAdjustmentRecord)
  i1148.m_FeatureLookupFlags = i1149[2]
  return i1148
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i1150 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i1151 = data
  i1150.m_GlyphIndex = i1151[0]
  i1150.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i1151[1], i1150.m_GlyphValueRecord)
  return i1150
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i1152 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i1153 = data
  i1152.m_XPlacement = i1153[0]
  i1152.m_YPlacement = i1153[1]
  i1152.m_XAdvance = i1153[2]
  i1152.m_YAdvance = i1153[3]
  return i1152
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i1156 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i1157 = data
  i1156.m_BaseGlyphID = i1157[0]
  i1156.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i1157[1], i1156.m_BaseGlyphAnchorPoint)
  i1156.m_MarkGlyphID = i1157[2]
  i1156.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i1157[3], i1156.m_MarkPositionAdjustment)
  return i1156
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i1160 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i1161 = data
  i1160.m_BaseMarkGlyphID = i1161[0]
  i1160.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i1161[1], i1160.m_BaseMarkGlyphAnchorPoint)
  i1160.m_CombiningMarkGlyphID = i1161[2]
  i1160.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i1161[3], i1160.m_CombiningMarkPositionAdjustment)
  return i1160
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i1166 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i1167 = data
  request.r(i1167[0], i1167[1], 0, i1166, 'regularTypeface')
  request.r(i1167[2], i1167[3], 0, i1166, 'italicTypeface')
  return i1166
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i1168 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i1169 = data
  i1168.Name = i1169[0]
  i1168.PointSize = i1169[1]
  i1168.Scale = i1169[2]
  i1168.CharacterCount = i1169[3]
  i1168.LineHeight = i1169[4]
  i1168.Baseline = i1169[5]
  i1168.Ascender = i1169[6]
  i1168.CapHeight = i1169[7]
  i1168.Descender = i1169[8]
  i1168.CenterLine = i1169[9]
  i1168.SuperscriptOffset = i1169[10]
  i1168.SubscriptOffset = i1169[11]
  i1168.SubSize = i1169[12]
  i1168.Underline = i1169[13]
  i1168.UnderlineThickness = i1169[14]
  i1168.strikethrough = i1169[15]
  i1168.strikethroughThickness = i1169[16]
  i1168.TabWidth = i1169[17]
  i1168.Padding = i1169[18]
  i1168.AtlasWidth = i1169[19]
  i1168.AtlasHeight = i1169[20]
  return i1168
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i1172 = root || request.c( 'TMPro.TMP_Glyph' )
  var i1173 = data
  i1172.id = i1173[0]
  i1172.x = i1173[1]
  i1172.y = i1173[2]
  i1172.width = i1173[3]
  i1172.height = i1173[4]
  i1172.xOffset = i1173[5]
  i1172.yOffset = i1173[6]
  i1172.xAdvance = i1173[7]
  i1172.scale = i1173[8]
  return i1172
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i1174 = root || request.c( 'TMPro.KerningTable' )
  var i1175 = data
  var i1177 = i1175[0]
  var i1176 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i1177.length; i += 1) {
    i1176.add(request.d('TMPro.KerningPair', i1177[i + 0]));
  }
  i1174.kerningPairs = i1176
  return i1174
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i1180 = root || request.c( 'TMPro.KerningPair' )
  var i1181 = data
  i1180.xOffset = i1181[0]
  i1180.m_FirstGlyph = i1181[1]
  i1180.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i1181[2], i1180.m_FirstGlyphAdjustments)
  i1180.m_SecondGlyph = i1181[3]
  i1180.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i1181[4], i1180.m_SecondGlyphAdjustments)
  i1180.m_IgnoreSpacingAdjustments = !!i1181[5]
  return i1180
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i1182 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i1183 = data
  i1182.m_FaceIndex = i1183[0]
  i1182.m_FamilyName = i1183[1]
  i1182.m_StyleName = i1183[2]
  i1182.m_PointSize = i1183[3]
  i1182.m_Scale = i1183[4]
  i1182.m_UnitsPerEM = i1183[5]
  i1182.m_LineHeight = i1183[6]
  i1182.m_AscentLine = i1183[7]
  i1182.m_CapLine = i1183[8]
  i1182.m_MeanLine = i1183[9]
  i1182.m_Baseline = i1183[10]
  i1182.m_DescentLine = i1183[11]
  i1182.m_SuperscriptOffset = i1183[12]
  i1182.m_SuperscriptSize = i1183[13]
  i1182.m_SubscriptOffset = i1183[14]
  i1182.m_SubscriptSize = i1183[15]
  i1182.m_UnderlineOffset = i1183[16]
  i1182.m_UnderlineThickness = i1183[17]
  i1182.m_StrikethroughOffset = i1183[18]
  i1182.m_StrikethroughThickness = i1183[19]
  i1182.m_TabWidth = i1183[20]
  return i1182
}

Deserializers["EquipmentSetData"] = function (request, data, root) {
  var i1184 = root || request.c( 'EquipmentSetData' )
  var i1185 = data
  request.r(i1185[0], i1185[1], 0, i1184, 'targetSkeletonDataAsset')
  var i1187 = i1185[2]
  var i1186 = new (System.Collections.Generic.List$1(Bridge.ns('System.String')))
  for(var i = 0; i < i1187.length; i += 1) {
    i1186.add(i1187[i + 0]);
  }
  i1184.skinNames = i1186
  var i1189 = i1185[3]
  var i1188 = new (System.Collections.Generic.List$1(Bridge.ns('SlotAttachmentPair')))
  for(var i = 0; i < i1189.length; i += 1) {
    i1188.add(request.d('SlotAttachmentPair', i1189[i + 0]));
  }
  i1184.attachmentPairs = i1188
  return i1184
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i1190 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i1191 = data
  i1190.useSafeMode = !!i1191[0]
  i1190.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i1191[1], i1190.safeModeOptions)
  i1190.timeScale = i1191[2]
  i1190.unscaledTimeScale = i1191[3]
  i1190.useSmoothDeltaTime = !!i1191[4]
  i1190.maxSmoothUnscaledTime = i1191[5]
  i1190.rewindCallbackMode = i1191[6]
  i1190.showUnityEditorReport = !!i1191[7]
  i1190.logBehaviour = i1191[8]
  i1190.drawGizmos = !!i1191[9]
  i1190.defaultRecyclable = !!i1191[10]
  i1190.defaultAutoPlay = i1191[11]
  i1190.defaultUpdateType = i1191[12]
  i1190.defaultTimeScaleIndependent = !!i1191[13]
  i1190.defaultEaseType = i1191[14]
  i1190.defaultEaseOvershootOrAmplitude = i1191[15]
  i1190.defaultEasePeriod = i1191[16]
  i1190.defaultAutoKill = !!i1191[17]
  i1190.defaultLoopType = i1191[18]
  i1190.debugMode = !!i1191[19]
  i1190.debugStoreTargetId = !!i1191[20]
  i1190.showPreviewPanel = !!i1191[21]
  i1190.storeSettingsLocation = i1191[22]
  i1190.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i1191[23], i1190.modules)
  i1190.createASMDEF = !!i1191[24]
  i1190.showPlayingTweens = !!i1191[25]
  i1190.showPausedTweens = !!i1191[26]
  return i1190
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i1192 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i1193 = data
  i1192.logBehaviour = i1193[0]
  i1192.nestedTweenFailureBehaviour = i1193[1]
  return i1192
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i1194 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i1195 = data
  i1194.showPanel = !!i1195[0]
  i1194.audioEnabled = !!i1195[1]
  i1194.physicsEnabled = !!i1195[2]
  i1194.physics2DEnabled = !!i1195[3]
  i1194.spriteEnabled = !!i1195[4]
  i1194.uiEnabled = !!i1195[5]
  i1194.uiToolkitEnabled = !!i1195[6]
  i1194.textMeshProEnabled = !!i1195[7]
  i1194.tk2DEnabled = !!i1195[8]
  i1194.deAudioEnabled = !!i1195[9]
  i1194.deUnityExtendedEnabled = !!i1195[10]
  i1194.epoOutlineEnabled = !!i1195[11]
  return i1194
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i1196 = root || request.c( 'TMPro.TMP_Settings' )
  var i1197 = data
  i1196.assetVersion = i1197[0]
  i1196.m_TextWrappingMode = i1197[1]
  i1196.m_enableKerning = !!i1197[2]
  var i1199 = i1197[3]
  var i1198 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i1199.length; i += 1) {
    i1198.add(i1199[i + 0]);
  }
  i1196.m_ActiveFontFeatures = i1198
  i1196.m_enableExtraPadding = !!i1197[4]
  i1196.m_enableTintAllSprites = !!i1197[5]
  i1196.m_enableParseEscapeCharacters = !!i1197[6]
  i1196.m_EnableRaycastTarget = !!i1197[7]
  i1196.m_GetFontFeaturesAtRuntime = !!i1197[8]
  i1196.m_missingGlyphCharacter = i1197[9]
  i1196.m_ClearDynamicDataOnBuild = !!i1197[10]
  i1196.m_warningsDisabled = !!i1197[11]
  request.r(i1197[12], i1197[13], 0, i1196, 'm_defaultFontAsset')
  i1196.m_defaultFontAssetPath = i1197[14]
  i1196.m_defaultFontSize = i1197[15]
  i1196.m_defaultAutoSizeMinRatio = i1197[16]
  i1196.m_defaultAutoSizeMaxRatio = i1197[17]
  i1196.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i1197[18], i1197[19] )
  i1196.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i1197[20], i1197[21] )
  i1196.m_autoSizeTextContainer = !!i1197[22]
  i1196.m_IsTextObjectScaleStatic = !!i1197[23]
  var i1201 = i1197[24]
  var i1200 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1201.length; i += 2) {
  request.r(i1201[i + 0], i1201[i + 1], 1, i1200, '')
  }
  i1196.m_fallbackFontAssets = i1200
  i1196.m_matchMaterialPreset = !!i1197[25]
  i1196.m_HideSubTextObjects = !!i1197[26]
  request.r(i1197[27], i1197[28], 0, i1196, 'm_defaultSpriteAsset')
  i1196.m_defaultSpriteAssetPath = i1197[29]
  i1196.m_enableEmojiSupport = !!i1197[30]
  i1196.m_MissingCharacterSpriteUnicode = i1197[31]
  var i1203 = i1197[32]
  var i1202 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i1203.length; i += 2) {
  request.r(i1203[i + 0], i1203[i + 1], 1, i1202, '')
  }
  i1196.m_EmojiFallbackTextAssets = i1202
  i1196.m_defaultColorGradientPresetsPath = i1197[33]
  request.r(i1197[34], i1197[35], 0, i1196, 'm_defaultStyleSheet')
  i1196.m_StyleSheetsResourcePath = i1197[36]
  request.r(i1197[37], i1197[38], 0, i1196, 'm_leadingCharacters')
  request.r(i1197[39], i1197[40], 0, i1196, 'm_followingCharacters')
  i1196.m_UseModernHangulLineBreakingRules = !!i1197[41]
  return i1196
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i1206 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i1207 = data
  request.r(i1207[0], i1207[1], 0, i1206, 'spriteSheet')
  var i1209 = i1207[2]
  var i1208 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i1209.length; i += 1) {
    i1208.add(request.d('TMPro.TMP_Sprite', i1209[i + 0]));
  }
  i1206.spriteInfoList = i1208
  var i1211 = i1207[3]
  var i1210 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i1211.length; i += 2) {
  request.r(i1211[i + 0], i1211[i + 1], 1, i1210, '')
  }
  i1206.fallbackSpriteAssets = i1210
  var i1213 = i1207[4]
  var i1212 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i1213.length; i += 1) {
    i1212.add(request.d('TMPro.TMP_SpriteCharacter', i1213[i + 0]));
  }
  i1206.m_SpriteCharacterTable = i1212
  var i1215 = i1207[5]
  var i1214 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i1215.length; i += 1) {
    i1214.add(request.d('TMPro.TMP_SpriteGlyph', i1215[i + 0]));
  }
  i1206.m_GlyphTable = i1214
  i1206.m_Version = i1207[6]
  i1206.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i1207[7], i1206.m_FaceInfo)
  request.r(i1207[8], i1207[9], 0, i1206, 'm_Material')
  return i1206
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i1218 = root || request.c( 'TMPro.TMP_Sprite' )
  var i1219 = data
  i1218.name = i1219[0]
  i1218.hashCode = i1219[1]
  i1218.unicode = i1219[2]
  i1218.pivot = new pc.Vec2( i1219[3], i1219[4] )
  request.r(i1219[5], i1219[6], 0, i1218, 'sprite')
  i1218.id = i1219[7]
  i1218.x = i1219[8]
  i1218.y = i1219[9]
  i1218.width = i1219[10]
  i1218.height = i1219[11]
  i1218.xOffset = i1219[12]
  i1218.yOffset = i1219[13]
  i1218.xAdvance = i1219[14]
  i1218.scale = i1219[15]
  return i1218
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i1224 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i1225 = data
  i1224.m_Name = i1225[0]
  i1224.m_ElementType = i1225[1]
  i1224.m_Unicode = i1225[2]
  i1224.m_GlyphIndex = i1225[3]
  i1224.m_Scale = i1225[4]
  return i1224
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i1228 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i1229 = data
  request.r(i1229[0], i1229[1], 0, i1228, 'sprite')
  i1228.m_Index = i1229[2]
  i1228.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i1229[3], i1228.m_Metrics)
  i1228.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i1229[4], i1228.m_GlyphRect)
  i1228.m_Scale = i1229[5]
  i1228.m_AtlasIndex = i1229[6]
  i1228.m_ClassDefinitionType = i1229[7]
  return i1228
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i1230 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i1231 = data
  var i1233 = i1231[0]
  var i1232 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i1233.length; i += 1) {
    i1232.add(request.d('TMPro.TMP_Style', i1233[i + 0]));
  }
  i1230.m_StyleList = i1232
  return i1230
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i1236 = root || request.c( 'TMPro.TMP_Style' )
  var i1237 = data
  i1236.m_Name = i1237[0]
  i1236.m_HashCode = i1237[1]
  i1236.m_OpeningDefinition = i1237[2]
  i1236.m_ClosingDefinition = i1237[3]
  i1236.m_OpeningTagArray = i1237[4]
  i1236.m_ClosingTagArray = i1237[5]
  return i1236
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i1238 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i1239 = data
  var i1241 = i1239[0]
  var i1240 = []
  for(var i = 0; i < i1241.length; i += 1) {
    i1240.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i1241[i + 0]) );
  }
  i1238.files = i1240
  i1238.componentToPrefabIds = i1239[1]
  return i1238
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i1244 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i1245 = data
  i1244.path = i1245[0]
  request.r(i1245[1], i1245[2], 0, i1244, 'unityObject')
  return i1244
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i1246 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i1247 = data
  var i1249 = i1247[0]
  var i1248 = []
  for(var i = 0; i < i1249.length; i += 1) {
    i1248.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i1249[i + 0]) );
  }
  i1246.scriptsExecutionOrder = i1248
  var i1251 = i1247[1]
  var i1250 = []
  for(var i = 0; i < i1251.length; i += 1) {
    i1250.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i1251[i + 0]) );
  }
  i1246.sortingLayers = i1250
  var i1253 = i1247[2]
  var i1252 = []
  for(var i = 0; i < i1253.length; i += 1) {
    i1252.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i1253[i + 0]) );
  }
  i1246.cullingLayers = i1252
  i1246.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i1247[3], i1246.timeSettings)
  i1246.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i1247[4], i1246.physicsSettings)
  i1246.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i1247[5], i1246.physics2DSettings)
  i1246.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1247[6], i1246.qualitySettings)
  i1246.enableRealtimeShadows = !!i1247[7]
  i1246.enableAutoInstancing = !!i1247[8]
  i1246.enableStaticBatching = !!i1247[9]
  i1246.enableDynamicBatching = !!i1247[10]
  i1246.lightmapEncodingQuality = i1247[11]
  i1246.desiredColorSpace = i1247[12]
  var i1255 = i1247[13]
  var i1254 = []
  for(var i = 0; i < i1255.length; i += 1) {
    i1254.push( i1255[i + 0] );
  }
  i1246.allTags = i1254
  return i1246
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i1258 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i1259 = data
  i1258.name = i1259[0]
  i1258.value = i1259[1]
  return i1258
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i1262 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i1263 = data
  i1262.id = i1263[0]
  i1262.name = i1263[1]
  i1262.value = i1263[2]
  return i1262
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i1266 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i1267 = data
  i1266.id = i1267[0]
  i1266.name = i1267[1]
  return i1266
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i1268 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i1269 = data
  i1268.fixedDeltaTime = i1269[0]
  i1268.maximumDeltaTime = i1269[1]
  i1268.timeScale = i1269[2]
  i1268.maximumParticleTimestep = i1269[3]
  return i1268
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i1270 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i1271 = data
  i1270.gravity = new pc.Vec3( i1271[0], i1271[1], i1271[2] )
  i1270.defaultSolverIterations = i1271[3]
  i1270.bounceThreshold = i1271[4]
  i1270.autoSyncTransforms = !!i1271[5]
  i1270.autoSimulation = !!i1271[6]
  var i1273 = i1271[7]
  var i1272 = []
  for(var i = 0; i < i1273.length; i += 1) {
    i1272.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i1273[i + 0]) );
  }
  i1270.collisionMatrix = i1272
  return i1270
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i1276 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i1277 = data
  i1276.enabled = !!i1277[0]
  i1276.layerId = i1277[1]
  i1276.otherLayerId = i1277[2]
  return i1276
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i1278 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i1279 = data
  request.r(i1279[0], i1279[1], 0, i1278, 'material')
  i1278.gravity = new pc.Vec2( i1279[2], i1279[3] )
  i1278.positionIterations = i1279[4]
  i1278.velocityIterations = i1279[5]
  i1278.velocityThreshold = i1279[6]
  i1278.maxLinearCorrection = i1279[7]
  i1278.maxAngularCorrection = i1279[8]
  i1278.maxTranslationSpeed = i1279[9]
  i1278.maxRotationSpeed = i1279[10]
  i1278.baumgarteScale = i1279[11]
  i1278.baumgarteTOIScale = i1279[12]
  i1278.timeToSleep = i1279[13]
  i1278.linearSleepTolerance = i1279[14]
  i1278.angularSleepTolerance = i1279[15]
  i1278.defaultContactOffset = i1279[16]
  i1278.autoSimulation = !!i1279[17]
  i1278.queriesHitTriggers = !!i1279[18]
  i1278.queriesStartInColliders = !!i1279[19]
  i1278.callbacksOnDisable = !!i1279[20]
  i1278.reuseCollisionCallbacks = !!i1279[21]
  i1278.autoSyncTransforms = !!i1279[22]
  var i1281 = i1279[23]
  var i1280 = []
  for(var i = 0; i < i1281.length; i += 1) {
    i1280.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i1281[i + 0]) );
  }
  i1278.collisionMatrix = i1280
  return i1278
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i1284 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i1285 = data
  i1284.enabled = !!i1285[0]
  i1284.layerId = i1285[1]
  i1284.otherLayerId = i1285[2]
  return i1284
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i1286 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i1287 = data
  var i1289 = i1287[0]
  var i1288 = []
  for(var i = 0; i < i1289.length; i += 1) {
    i1288.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1289[i + 0]) );
  }
  i1286.qualityLevels = i1288
  var i1291 = i1287[1]
  var i1290 = []
  for(var i = 0; i < i1291.length; i += 1) {
    i1290.push( i1291[i + 0] );
  }
  i1286.names = i1290
  i1286.shadows = i1287[2]
  i1286.anisotropicFiltering = i1287[3]
  i1286.antiAliasing = i1287[4]
  i1286.lodBias = i1287[5]
  i1286.shadowCascades = i1287[6]
  i1286.shadowDistance = i1287[7]
  i1286.shadowmaskMode = i1287[8]
  i1286.shadowProjection = i1287[9]
  i1286.shadowResolution = i1287[10]
  i1286.softParticles = !!i1287[11]
  i1286.softVegetation = !!i1287[12]
  i1286.activeColorSpace = i1287[13]
  i1286.desiredColorSpace = i1287[14]
  i1286.masterTextureLimit = i1287[15]
  i1286.maxQueuedFrames = i1287[16]
  i1286.particleRaycastBudget = i1287[17]
  i1286.pixelLightCount = i1287[18]
  i1286.realtimeReflectionProbes = !!i1287[19]
  i1286.shadowCascade2Split = i1287[20]
  i1286.shadowCascade4Split = new pc.Vec3( i1287[21], i1287[22], i1287[23] )
  i1286.streamingMipmapsActive = !!i1287[24]
  i1286.vSyncCount = i1287[25]
  i1286.asyncUploadBufferSize = i1287[26]
  i1286.asyncUploadTimeSlice = i1287[27]
  i1286.billboardsFaceCameraPosition = !!i1287[28]
  i1286.shadowNearPlaneOffset = i1287[29]
  i1286.streamingMipmapsMemoryBudget = i1287[30]
  i1286.maximumLODLevel = i1287[31]
  i1286.streamingMipmapsAddAllCameras = !!i1287[32]
  i1286.streamingMipmapsMaxLevelReduction = i1287[33]
  i1286.streamingMipmapsRenderersPerFrame = i1287[34]
  i1286.resolutionScalingFixedDPIFactor = i1287[35]
  i1286.streamingMipmapsMaxFileIORequests = i1287[36]
  i1286.currentQualityLevel = i1287[37]
  return i1286
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i1296 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i1297 = data
  i1296.weight = i1297[0]
  i1296.vertices = i1297[1]
  i1296.normals = i1297[2]
  i1296.tangents = i1297[3]
  return i1296
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition"] = function (request, data, root) {
  var i1300 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition' )
  var i1301 = data
  i1300.mode = i1301[0]
  i1300.parameter = i1301[1]
  i1300.threshold = i1301[2]
  return i1300
}

Deserializers["TMPro.GlyphAnchorPoint"] = function (request, data, root) {
  var i1302 = root || request.c( 'TMPro.GlyphAnchorPoint' )
  var i1303 = data
  i1302.m_XCoordinate = i1303[0]
  i1302.m_YCoordinate = i1303[1]
  return i1302
}

Deserializers["TMPro.MarkPositionAdjustment"] = function (request, data, root) {
  var i1304 = root || request.c( 'TMPro.MarkPositionAdjustment' )
  var i1305 = data
  i1304.m_XPositionAdjustment = i1305[0]
  i1304.m_YPositionAdjustment = i1305[1]
  return i1304
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i1306 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i1307 = data
  i1306.xPlacement = i1307[0]
  i1306.yPlacement = i1307[1]
  i1306.xAdvance = i1307[2]
  i1306.yAdvance = i1307[3]
  return i1306
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"useSimplification":2,"useUInt32IndexFormat":3,"vertexCount":4,"aabb":5,"streams":6,"vertices":7,"subMeshes":8,"bindposes":9,"blendShapes":10},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Components.Transform":{"position":0,"scale":3,"rotation":6},"Luna.Unity.DTO.UnityEngine.Components.Animator":{"animatorController":0,"avatar":2,"updateMode":4,"hasTransformHierarchy":5,"applyRootMotion":6,"humanBones":7,"enabled":8},"Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer":{"color":0,"sprite":4,"flipX":6,"flipY":7,"drawMode":8,"size":9,"tileMode":11,"adaptiveModeThreshold":12,"maskInteraction":13,"spriteSortPoint":14,"enabled":15,"sharedMaterial":16,"sharedMaterials":18,"receiveShadows":19,"shadowCastingMode":20,"sortingLayerID":21,"sortingOrder":22,"lightmapIndex":23,"lightmapSceneIndex":24,"lightmapScaleOffset":25,"lightProbeUsage":29,"reflectionProbeUsage":30},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider":{"center":0,"radius":3,"height":4,"direction":5,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"referenceAmbientProbe":36,"useReferenceAmbientProbe":37,"customReflection":38,"defaultReflection":40,"defaultReflectionMode":42,"defaultReflectionResolution":43,"sunLightObjectId":44,"pixelLightCount":45,"defaultReflectionHDR":46,"hasLightDataAsset":47,"hasManualGenerate":48},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip":{"name":0,"wrapMode":1,"isLooping":2,"length":3,"curves":4,"events":5,"halfPrecision":6,"_frameRate":7,"localBounds":8,"hasMuscleCurves":9,"clipMuscleConstant":10,"clipBindingConstant":11},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve":{"path":0,"hash":1,"componentType":2,"property":3,"keys":4,"objectReferenceKeys":5},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey":{"time":0,"value":1},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent":{"functionName":0,"floatParameter":1,"intParameter":2,"stringParameter":3,"objectReferenceParameter":4,"time":6},"Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds":{"center":0,"extends":3},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant":{"genericBindings":0,"pptrCurveMapping":1},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController":{"name":0,"layers":1,"parameters":2,"animationClips":3,"avatarUnsupported":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer":{"name":0,"defaultWeight":1,"blendingMode":2,"avatarMask":3,"syncedLayerIndex":4,"syncedLayerAffectsTiming":5,"syncedLayers":6,"stateMachine":7},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine":{"id":0,"name":1,"path":2,"states":3,"machines":4,"entryStateTransitions":5,"exitStateTransitions":6,"anyStateTransitions":7,"defaultStateId":8},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState":{"id":0,"name":1,"cycleOffset":2,"cycleOffsetParameter":3,"cycleOffsetParameterActive":4,"mirror":5,"mirrorParameter":6,"mirrorParameterActive":7,"motionId":8,"nameHash":9,"fullPathHash":10,"speed":11,"speedParameter":12,"speedParameterActive":13,"tag":14,"tagHash":15,"writeDefaultValues":16,"behaviours":17,"transitions":18},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition":{"fullPath":0,"canTransitionToSelf":1,"duration":2,"exitTime":3,"hasExitTime":4,"hasFixedDuration":5,"interruptionSource":6,"offset":7,"orderedInterruption":8,"destinationStateId":9,"isExit":10,"mute":11,"solo":12,"conditions":13},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition":{"destinationStateId":0,"isExit":1,"mute":2,"solo":3,"conditions":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter":{"defaultBool":0,"defaultFloat":1,"defaultInt":2,"name":3,"nameHash":4,"type":5},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"lightmapEncodingQuality":11,"desiredColorSpace":12,"allTags":13},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition":{"mode":0,"parameter":1,"threshold":2}}

Deserializers.requiredComponents = {"47":[48],"49":[48],"50":[48],"51":[48],"52":[48],"53":[48],"54":[55],"56":[8],"57":[58],"59":[58],"60":[58],"61":[58],"62":[58],"63":[58],"64":[65],"66":[65],"67":[65],"68":[65],"69":[65],"70":[65],"71":[65],"72":[65],"73":[65],"74":[65],"75":[65],"76":[65],"77":[65],"78":[8],"79":[28],"80":[81],"82":[81],"83":[27],"11":[8],"84":[85],"86":[27],"87":[88,27],"34":[28],"89":[88,27],"90":[3,28],"91":[28],"92":[28,32],"93":[58],"94":[65],"95":[85],"96":[97],"98":[5],"99":[8],"100":[101],"102":[38],"103":[83],"104":[27],"30":[28,27],"105":[27,88],"106":[27],"107":[88,27],"108":[28],"109":[88,27],"110":[27],"111":[112],"113":[112],"114":[112],"115":[27],"116":[27],"117":[83],"118":[88,27],"119":[27],"120":[83],"121":[27],"122":[27],"123":[27],"124":[27],"125":[27],"126":[27],"127":[27],"128":[27],"129":[27],"130":[88,27],"131":[27],"132":[27],"133":[27],"134":[27],"135":[88,27],"136":[27],"137":[38],"138":[38],"39":[38],"139":[38],"140":[8],"141":[8]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Texture2D","UnityEngine.Transform","UnityEngine.Animator","UnityEditor.Animations.AnimatorController","UnityEngine.SpriteRenderer","UnityEngine.Sprite","UnityEngine.Material","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.MonoBehaviour","AutoCameraFit","CharacterManager","Character","EquipmentSetData","Spine.Unity.SkeletonDataAsset","GameManager","SlotManager","SlotSetup","UnityEngine.GameObject","Ply_Pool","Ply_SoundManager","UnityEngine.AudioClip","UnityEngine.AudioSource","ProgressTrackingManager","ScreenHeightPositionAnchor","SlotDataSO","UnityEngine.RectTransform","UnityEngine.MeshRenderer","UnityEngine.EventSystems.UIBehaviour","TMPro.TextMeshPro","TMPro.TMP_FontAsset","UnityEngine.MeshFilter","UnityEngine.Mesh","Spine.Unity.SkeletonAnimation","UnityEngine.CapsuleCollider","BalloonController","BalloonActionTrigger","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","Spine.Unity.SpineAtlasAsset","UnityEngine.TextAsset","UnityEngine.Font","DG.Tweening.Core.DOTweenSettings","TMPro.TMP_Settings","TMPro.TMP_SpriteAsset","TMPro.TMP_StyleSheet","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.SkinnedMeshRenderer","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.Canvas","Spine.Unity.EditorSkeletonPlayer","Spine.Unity.ISkeletonAnimation","Spine.Unity.BoneFollowerGraphic","Spine.Unity.SkeletonSubmeshGraphic","UnityEngine.CanvasRenderer","Spine.Unity.SkeletonGraphic","Spine.Unity.SkeletonMecanim","Spine.Unity.SkeletonRenderer","Spine.Unity.SkeletonPartsRenderer","Spine.Unity.FollowLocationRigidbody","Spine.Unity.FollowLocationRigidbody2D","Spine.Unity.SkeletonUtility","Spine.Unity.SkeletonUtilityConstraint","Spine.Unity.SkeletonUtilityBone","UnityEngine.U2D.Animation.SpriteSkin","UnityEngine.U2D.PixelPerfectCamera","UnityEngine.U2D.SpriteShapeController","UnityEngine.U2D.SpriteShapeRenderer","UnityEngine.InputSystem.UI.InputSystemUIInputModule","UnityEngine.InputSystem.UI.TrackedDeviceRaycaster","TMPro.TextContainer","TMPro.TextMeshProUGUI","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.GraphicRaycaster","UnityEngine.UI.Image","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.CanvasScaler","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.Mask","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.Scrollbar","UnityEngine.UI.ScrollRect","UnityEngine.UI.Slider","UnityEngine.UI.Text","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.38f1";

Deserializers.productName = "PLY_LeftOrRight";

Deserializers.lunaInitializationTime = "07/24/2026 10:13:04";

Deserializers.lunaDaysRunning = "25.9";

Deserializers.lunaVersion = "7.1.0";

Deserializers.lunaSHA = "cf93782349542fe0b84ad13951a26809f8419628";

Deserializers.creativeName = "LeftOrRight_Ply9";

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

Deserializers.runtimeAnalysisExcludedClassesCount = "1914";

Deserializers.runtimeAnalysisExcludedMethodsCount = "5412";

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

Deserializers.buildID = "04586e8b-8d61-4cb3-87cf-af43bb0fb73f";

Deserializers.runtimeInitializeOnLoadInfos = [[["Unity","Services","Core","Internal","UnityServicesInitializer","EnableServicesInitializationAsync"],["UnityEngine","U2D","Animation","GpuDeformationSystem","CreateFallbackBuffer"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["DG","Tweening","DOTween","RuntimeOnLoad"],["Sirenix","Utilities","UnityVersion","EnsureLoaded"],["Sirenix","Serialization","Utilities","UnityVersion","EnsureLoaded"],["Sirenix","Serialization","UnitySerializationInitializer","InitializeRuntime"],["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["Unity","Services","Core","Registration","CorePackageInitializer","InitializeOnLoad"],["Unity","Services","Core","Internal","TaskAsyncOperation","SetScheduler"],["Unity","Services","Core","Environments","Client","Scheduler","EngineStateHelper","Init"],["Unity","Services","Core","Environments","Client","Scheduler","ThreadHelper","Init"],["Ua2CoreInitializeCallback","Register"],["UnityEngine","InputSystem","InputSystem","RunInitialUpdate"],["Unity","AI","Navigation","NavMeshLink","ClearTrackedList"],["Unity","AI","Navigation","NavMeshSurface","ClearNavMeshSurfaces"],["Unity","AI","Navigation","NavMeshModifierVolume","ClearNavMeshModifiers"],["Unity","AI","Navigation","NavMeshModifier","ClearNavMeshModifiers"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["Unity","Services","Core","Internal","UnityServicesInitializer","CreateStaticInstance"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"]],[["Unity","Services","Core","Environments","Client","Http","JsonHelpers","RegisterTypesForAOT"]],[["Unity","Services","Core","UnityThreadUtils","CaptureUnityThreadInfo"],["UnityEngine","InputSystem","Plugins","InputForUI","InputSystemProvider","Bootstrap"],["UnityEngine","InputSystem","InputSystem","RunInitializeInPlayer"],["Spine","Unity","AttachmentTools","AtlasUtilities","Init"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

