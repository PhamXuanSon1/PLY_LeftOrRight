var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i648 = root || request.c( 'UnityEngine.JointSpring' )
  var i649 = data
  i648.spring = i649[0]
  i648.damper = i649[1]
  i648.targetPosition = i649[2]
  return i648
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i650 = root || request.c( 'UnityEngine.JointMotor' )
  var i651 = data
  i650.m_TargetVelocity = i651[0]
  i650.m_Force = i651[1]
  i650.m_FreeSpin = i651[2]
  return i650
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i652 = root || request.c( 'UnityEngine.JointLimits' )
  var i653 = data
  i652.m_Min = i653[0]
  i652.m_Max = i653[1]
  i652.m_Bounciness = i653[2]
  i652.m_BounceMinVelocity = i653[3]
  i652.m_ContactDistance = i653[4]
  i652.minBounce = i653[5]
  i652.maxBounce = i653[6]
  return i652
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i654 = root || request.c( 'UnityEngine.JointDrive' )
  var i655 = data
  i654.m_PositionSpring = i655[0]
  i654.m_PositionDamper = i655[1]
  i654.m_MaximumForce = i655[2]
  i654.m_UseAcceleration = i655[3]
  return i654
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i656 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i657 = data
  i656.m_Spring = i657[0]
  i656.m_Damper = i657[1]
  return i656
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i658 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i659 = data
  i658.m_Limit = i659[0]
  i658.m_Bounciness = i659[1]
  i658.m_ContactDistance = i659[2]
  return i658
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i660 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i661 = data
  i660.m_ExtremumSlip = i661[0]
  i660.m_ExtremumValue = i661[1]
  i660.m_AsymptoteSlip = i661[2]
  i660.m_AsymptoteValue = i661[3]
  i660.m_Stiffness = i661[4]
  return i660
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i662 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i663 = data
  i662.m_LowerAngle = i663[0]
  i662.m_UpperAngle = i663[1]
  return i662
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i664 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i665 = data
  i664.m_MotorSpeed = i665[0]
  i664.m_MaximumMotorTorque = i665[1]
  return i664
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i666 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i667 = data
  i666.m_DampingRatio = i667[0]
  i666.m_Frequency = i667[1]
  i666.m_Angle = i667[2]
  return i666
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i668 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i669 = data
  i668.m_LowerTranslation = i669[0]
  i668.m_UpperTranslation = i669[1]
  return i668
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i670 = root || new pc.UnityMaterial()
  var i671 = data
  i670.name = i671[0]
  request.r(i671[1], i671[2], 0, i670, 'shader')
  i670.renderQueue = i671[3]
  i670.enableInstancing = !!i671[4]
  var i673 = i671[5]
  var i672 = []
  for(var i = 0; i < i673.length; i += 1) {
    i672.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i673[i + 0]) );
  }
  i670.floatParameters = i672
  var i675 = i671[6]
  var i674 = []
  for(var i = 0; i < i675.length; i += 1) {
    i674.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i675[i + 0]) );
  }
  i670.colorParameters = i674
  var i677 = i671[7]
  var i676 = []
  for(var i = 0; i < i677.length; i += 1) {
    i676.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i677[i + 0]) );
  }
  i670.vectorParameters = i676
  var i679 = i671[8]
  var i678 = []
  for(var i = 0; i < i679.length; i += 1) {
    i678.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i679[i + 0]) );
  }
  i670.textureParameters = i678
  var i681 = i671[9]
  var i680 = []
  for(var i = 0; i < i681.length; i += 1) {
    i680.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i681[i + 0]) );
  }
  i670.materialFlags = i680
  return i670
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i684 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i685 = data
  i684.name = i685[0]
  i684.value = i685[1]
  return i684
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i688 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i689 = data
  i688.name = i689[0]
  i688.value = new pc.Color(i689[1], i689[2], i689[3], i689[4])
  return i688
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i692 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i693 = data
  i692.name = i693[0]
  i692.value = new pc.Vec4( i693[1], i693[2], i693[3], i693[4] )
  return i692
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i696 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i697 = data
  i696.name = i697[0]
  request.r(i697[1], i697[2], 0, i696, 'value')
  return i696
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i700 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i701 = data
  i700.name = i701[0]
  i700.enabled = !!i701[1]
  return i700
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i702 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i703 = data
  i702.name = i703[0]
  i702.width = i703[1]
  i702.height = i703[2]
  i702.mipmapCount = i703[3]
  i702.anisoLevel = i703[4]
  i702.filterMode = i703[5]
  i702.hdr = !!i703[6]
  i702.format = i703[7]
  i702.wrapMode = i703[8]
  i702.alphaIsTransparency = !!i703[9]
  i702.alphaSource = i703[10]
  i702.graphicsFormat = i703[11]
  i702.sRGBTexture = !!i703[12]
  i702.desiredColorSpace = i703[13]
  i702.wrapU = i703[14]
  i702.wrapV = i703[15]
  return i702
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i704 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i705 = data
  i704.name = i705[0]
  i704.halfPrecision = !!i705[1]
  i704.useSimplification = !!i705[2]
  i704.useUInt32IndexFormat = !!i705[3]
  i704.vertexCount = i705[4]
  i704.aabb = i705[5]
  var i707 = i705[6]
  var i706 = []
  for(var i = 0; i < i707.length; i += 1) {
    i706.push( !!i707[i + 0] );
  }
  i704.streams = i706
  i704.vertices = i705[7]
  var i709 = i705[8]
  var i708 = []
  for(var i = 0; i < i709.length; i += 1) {
    i708.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i709[i + 0]) );
  }
  i704.subMeshes = i708
  var i711 = i705[9]
  var i710 = []
  for(var i = 0; i < i711.length; i += 16) {
    i710.push( new pc.Mat4().setData(i711[i + 0], i711[i + 1], i711[i + 2], i711[i + 3],  i711[i + 4], i711[i + 5], i711[i + 6], i711[i + 7],  i711[i + 8], i711[i + 9], i711[i + 10], i711[i + 11],  i711[i + 12], i711[i + 13], i711[i + 14], i711[i + 15]) );
  }
  i704.bindposes = i710
  var i713 = i705[10]
  var i712 = []
  for(var i = 0; i < i713.length; i += 1) {
    i712.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i713[i + 0]) );
  }
  i704.blendShapes = i712
  return i704
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i718 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i719 = data
  i718.triangles = i719[0]
  return i718
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i724 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i725 = data
  i724.name = i725[0]
  var i727 = i725[1]
  var i726 = []
  for(var i = 0; i < i727.length; i += 1) {
    i726.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i727[i + 0]) );
  }
  i724.frames = i726
  return i724
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Transform"] = function (request, data, root) {
  var i728 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Transform' )
  var i729 = data
  i728.position = new pc.Vec3( i729[0], i729[1], i729[2] )
  i728.scale = new pc.Vec3( i729[3], i729[4], i729[5] )
  i728.rotation = new pc.Quat(i729[6], i729[7], i729[8], i729[9])
  return i728
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Animator"] = function (request, data, root) {
  var i730 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Animator' )
  var i731 = data
  request.r(i731[0], i731[1], 0, i730, 'animatorController')
  request.r(i731[2], i731[3], 0, i730, 'avatar')
  i730.updateMode = i731[4]
  i730.hasTransformHierarchy = !!i731[5]
  i730.applyRootMotion = !!i731[6]
  var i733 = i731[7]
  var i732 = []
  for(var i = 0; i < i733.length; i += 2) {
  request.r(i733[i + 0], i733[i + 1], 2, i732, '')
  }
  i730.humanBones = i732
  i730.enabled = !!i731[8]
  return i730
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer"] = function (request, data, root) {
  var i736 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer' )
  var i737 = data
  i736.color = new pc.Color(i737[0], i737[1], i737[2], i737[3])
  request.r(i737[4], i737[5], 0, i736, 'sprite')
  i736.flipX = !!i737[6]
  i736.flipY = !!i737[7]
  i736.drawMode = i737[8]
  i736.size = new pc.Vec2( i737[9], i737[10] )
  i736.tileMode = i737[11]
  i736.adaptiveModeThreshold = i737[12]
  i736.maskInteraction = i737[13]
  i736.spriteSortPoint = i737[14]
  i736.enabled = !!i737[15]
  request.r(i737[16], i737[17], 0, i736, 'sharedMaterial')
  var i739 = i737[18]
  var i738 = []
  for(var i = 0; i < i739.length; i += 2) {
  request.r(i739[i + 0], i739[i + 1], 2, i738, '')
  }
  i736.sharedMaterials = i738
  i736.receiveShadows = !!i737[19]
  i736.shadowCastingMode = i737[20]
  i736.sortingLayerID = i737[21]
  i736.sortingOrder = i737[22]
  i736.lightmapIndex = i737[23]
  i736.lightmapSceneIndex = i737[24]
  i736.lightmapScaleOffset = new pc.Vec4( i737[25], i737[26], i737[27], i737[28] )
  i736.lightProbeUsage = i737[29]
  i736.reflectionProbeUsage = i737[30]
  return i736
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i742 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i743 = data
  i742.name = i743[0]
  i742.tagId = i743[1]
  i742.enabled = !!i743[2]
  i742.isStatic = !!i743[3]
  i742.layer = i743[4]
  return i742
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i744 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i745 = data
  i744.name = i745[0]
  i744.index = i745[1]
  i744.startup = !!i745[2]
  return i744
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i746 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i747 = data
  i746.aspect = i747[0]
  i746.orthographic = !!i747[1]
  i746.orthographicSize = i747[2]
  i746.backgroundColor = new pc.Color(i747[3], i747[4], i747[5], i747[6])
  i746.nearClipPlane = i747[7]
  i746.farClipPlane = i747[8]
  i746.fieldOfView = i747[9]
  i746.depth = i747[10]
  i746.clearFlags = i747[11]
  i746.cullingMask = i747[12]
  i746.rect = i747[13]
  request.r(i747[14], i747[15], 0, i746, 'targetTexture')
  i746.usePhysicalProperties = !!i747[16]
  i746.focalLength = i747[17]
  i746.sensorSize = new pc.Vec2( i747[18], i747[19] )
  i746.lensShift = new pc.Vec2( i747[20], i747[21] )
  i746.gateFit = i747[22]
  i746.commandBufferCount = i747[23]
  i746.cameraType = i747[24]
  i746.enabled = !!i747[25]
  return i746
}

Deserializers["AutoCameraFit"] = function (request, data, root) {
  var i748 = root || request.c( 'AutoCameraFit' )
  var i749 = data
  request.r(i749[0], i749[1], 0, i748, 'tallScreenObject')
  i748.tallScreenRatioThreshold = i749[2]
  i748.tallScreenYOffset = i749[3]
  request.r(i749[4], i749[5], 0, i748, 'canvasBtn')
  request.r(i749[6], i749[7], 0, i748, 'targetArea')
  i748.paddingLandscape = i749[8]
  i748.paddingPortrait = i749[9]
  i748.extraPaddingSmallScreen = i749[10]
  i748.smallScreenThreshold = i749[11]
  i748.autoUpdateOnResize = !!i749[12]
  i748.adjustInEditMode = !!i749[13]
  return i748
}

Deserializers["CharacterManager"] = function (request, data, root) {
  var i750 = root || request.c( 'CharacterManager' )
  var i751 = data
  var i753 = i751[0]
  var i752 = new (System.Collections.Generic.List$1(Bridge.ns('CharacterEquipmentSetup')))
  for(var i = 0; i < i753.length; i += 1) {
    i752.add(request.d('CharacterEquipmentSetup', i753[i + 0]));
  }
  i750.characterSetups = i752
  request.r(i751[1], i751[2], 0, i750, 'character1')
  request.r(i751[3], i751[4], 0, i750, 'targetTestCharacter')
  request.r(i751[5], i751[6], 0, i750, 'testEquipmentDataAsset')
  var i755 = i751[7]
  var i754 = new (System.Collections.Generic.List$1(Bridge.ns('SkinToggleEntry')))
  for(var i = 0; i < i755.length; i += 1) {
    i754.add(request.d('SkinToggleEntry', i755[i + 0]));
  }
  i750.mySkinSet = i754
  return i750
}

Deserializers["CharacterEquipmentSetup"] = function (request, data, root) {
  var i758 = root || request.c( 'CharacterEquipmentSetup' )
  var i759 = data
  request.r(i759[0], i759[1], 0, i758, 'character')
  request.r(i759[2], i759[3], 0, i758, 'equipmentData')
  return i758
}

Deserializers["SkinToggleEntry"] = function (request, data, root) {
  var i762 = root || request.c( 'SkinToggleEntry' )
  var i763 = data
  i762.isEnabled = !!i763[0]
  i762.skinName = i763[1]
  request.r(i763[2], i763[3], 0, i762, 'skeletonDataAsset')
  return i762
}

Deserializers["GameManager"] = function (request, data, root) {
  var i764 = root || request.c( 'GameManager' )
  var i765 = data
  i764.isGoogleBuild = !!i765[0]
  var i767 = i765[1]
  var i766 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.GameObject')))
  for(var i = 0; i < i767.length; i += 2) {
  request.r(i767[i + 0], i767[i + 1], 1, i766, '')
  }
  i764.googleDisabledObjects = i766
  var i769 = i765[2]
  var i768 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Behaviour')))
  for(var i = 0; i < i769.length; i += 2) {
  request.r(i769[i + 0], i769[i + 1], 1, i768, '')
  }
  i764.googleDisabledBehaviours = i768
  return i764
}

Deserializers["SlotManager"] = function (request, data, root) {
  var i774 = root || request.c( 'SlotManager' )
  var i775 = data
  var i777 = i775[0]
  var i776 = new (System.Collections.Generic.List$1(Bridge.ns('SlotSetup')))
  for(var i = 0; i < i777.length; i += 2) {
  request.r(i777[i + 0], i777[i + 1], 1, i776, '')
  }
  i774.allSlots = i776
  i774.maxSlotsToPlay = i775[1]
  request.r(i775[2], i775[3], 0, i774, 'objectToHideOnFirstClick')
  request.r(i775[4], i775[5], 0, i774, 'rightEffectPrefab')
  request.r(i775[6], i775[7], 0, i774, 'rightEffectSpawnPoint')
  var i779 = i775[8]
  var i778 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Sprite')))
  for(var i = 0; i < i779.length; i += 2) {
  request.r(i779[i + 0], i779[i + 1], 1, i778, '')
  }
  i774.rightEffectSprites = i778
  return i774
}

Deserializers["Ply_Pool"] = function (request, data, root) {
  var i784 = root || request.c( 'Ply_Pool' )
  var i785 = data
  var i787 = i785[0]
  var i786 = []
  for(var i = 0; i < i787.length; i += 1) {
    i786.push( request.d('Ply_Pool+PoolAmount', i787[i + 0]) );
  }
  i784.poolAmounts = i786
  return i784
}

Deserializers["Ply_Pool+PoolAmount"] = function (request, data, root) {
  var i790 = root || request.c( 'Ply_Pool+PoolAmount' )
  var i791 = data
  i790.type = i791[0]
  i790.amount = i791[1]
  request.r(i791[2], i791[3], 0, i790, 'gameUnit')
  return i790
}

Deserializers["Ply_SoundManager"] = function (request, data, root) {
  var i792 = root || request.c( 'Ply_SoundManager' )
  var i793 = data
  i792.fxAudio = request.d('FxAudio', i793[0], i792.fxAudio)
  request.r(i793[1], i793[2], 0, i792, 'bgm')
  return i792
}

Deserializers["FxAudio"] = function (request, data, root) {
  var i794 = root || request.c( 'FxAudio' )
  var i795 = data
  i794.Left = request.d('SoundData', i795[0], i794.Left)
  i794.Right = request.d('SoundData', i795[1], i794.Right)
  i794.Yeah = request.d('SoundData', i795[2], i794.Yeah)
  return i794
}

Deserializers["SoundData"] = function (request, data, root) {
  var i796 = root || request.c( 'SoundData' )
  var i797 = data
  request.r(i797[0], i797[1], 0, i796, 'clip')
  i796.repeatCount = i797[2]
  return i796
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i798 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i799 = data
  request.r(i799[0], i799[1], 0, i798, 'clip')
  request.r(i799[2], i799[3], 0, i798, 'outputAudioMixerGroup')
  i798.playOnAwake = !!i799[4]
  i798.loop = !!i799[5]
  i798.time = i799[6]
  i798.volume = i799[7]
  i798.pitch = i799[8]
  i798.enabled = !!i799[9]
  return i798
}

Deserializers["ProgressTrackingManager"] = function (request, data, root) {
  var i800 = root || request.c( 'ProgressTrackingManager' )
  var i801 = data
  i800.maxScore = i801[0]
  i800.currentScore = i801[1]
  i800.currentPercent = i801[2]
  return i800
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider"] = function (request, data, root) {
  var i802 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider' )
  var i803 = data
  i802.center = new pc.Vec3( i803[0], i803[1], i803[2] )
  i802.radius = i803[3]
  i802.height = i803[4]
  i802.direction = i803[5]
  i802.enabled = !!i803[6]
  i802.isTrigger = !!i803[7]
  request.r(i803[8], i803[9], 0, i802, 'material')
  return i802
}

Deserializers["BalloonController"] = function (request, data, root) {
  var i804 = root || request.c( 'BalloonController' )
  var i805 = data
  request.r(i805[0], i805[1], 0, i804, 'targetItem')
  i804.interactableLayer = UnityEngine.LayerMask.FromIntegerValue( i805[2] )
  i804.flyDuration = i805[3]
  i804.scaleDuration = i805[4]
  i804.delayBeforeNextSlot = i805[5]
  i804.onBalloonClicked = request.d('UnityEngine.Events.UnityEvent', i805[6], i804.onBalloonClicked)
  return i804
}

Deserializers["UnityEngine.Events.UnityEvent"] = function (request, data, root) {
  var i806 = root || request.c( 'UnityEngine.Events.UnityEvent' )
  var i807 = data
  i806.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i807[0], i806.m_PersistentCalls)
  return i806
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i808 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i809 = data
  var i811 = i809[0]
  var i810 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i811.length; i += 1) {
    i810.add(request.d('UnityEngine.Events.PersistentCall', i811[i + 0]));
  }
  i808.m_Calls = i810
  return i808
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i814 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i815 = data
  request.r(i815[0], i815[1], 0, i814, 'm_Target')
  i814.m_TargetAssemblyTypeName = i815[2]
  i814.m_MethodName = i815[3]
  i814.m_Mode = i815[4]
  i814.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i815[5], i814.m_Arguments)
  i814.m_CallState = i815[6]
  return i814
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i816 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i817 = data
  request.r(i817[0], i817[1], 0, i816, 'm_ObjectArgument')
  i816.m_ObjectArgumentAssemblyTypeName = i817[2]
  i816.m_IntArgument = i817[3]
  i816.m_FloatArgument = i817[4]
  i816.m_StringArgument = i817[5]
  i816.m_BoolArgument = !!i817[6]
  return i816
}

Deserializers["BalloonActionTrigger"] = function (request, data, root) {
  var i818 = root || request.c( 'BalloonActionTrigger' )
  var i819 = data
  request.r(i819[0], i819[1], 0, i818, 'targetCharacter')
  i818.animationTrack = i819[2]
  i818.animationName = i819[3]
  i818.clearOtherAnimations = !!i819[4]
  request.r(i819[5], i819[6], 0, i818, 'skeletonDataAsset')
  return i818
}

Deserializers["SlotSetup"] = function (request, data, root) {
  var i820 = root || request.c( 'SlotSetup' )
  var i821 = data
  request.r(i821[0], i821[1], 0, i820, 'slotData')
  request.r(i821[2], i821[3], 0, i820, 'borderGold')
  request.r(i821[4], i821[5], 0, i820, 'borderWhite')
  request.r(i821[6], i821[7], 0, i820, 'greyCard')
  request.r(i821[8], i821[9], 0, i820, 'blueCard')
  request.r(i821[10], i821[11], 0, i820, 'greenCard')
  request.r(i821[12], i821[13], 0, i820, 'greenTick')
  request.r(i821[14], i821[15], 0, i820, 'leftBalloonObj')
  request.r(i821[16], i821[17], 0, i820, 'rightBalloonObj')
  request.r(i821[18], i821[19], 0, i820, 'leftBalloonItemRenderer')
  request.r(i821[20], i821[21], 0, i820, 'rightBalloonItemRenderer')
  return i820
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i822 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i823 = data
  request.r(i823[0], i823[1], 0, i822, 'sharedMesh')
  return i822
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i824 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i825 = data
  request.r(i825[0], i825[1], 0, i824, 'additionalVertexStreams')
  i824.enabled = !!i825[2]
  request.r(i825[3], i825[4], 0, i824, 'sharedMaterial')
  var i827 = i825[5]
  var i826 = []
  for(var i = 0; i < i827.length; i += 2) {
  request.r(i827[i + 0], i827[i + 1], 2, i826, '')
  }
  i824.sharedMaterials = i826
  i824.receiveShadows = !!i825[6]
  i824.shadowCastingMode = i825[7]
  i824.sortingLayerID = i825[8]
  i824.sortingOrder = i825[9]
  i824.lightmapIndex = i825[10]
  i824.lightmapSceneIndex = i825[11]
  i824.lightmapScaleOffset = new pc.Vec4( i825[12], i825[13], i825[14], i825[15] )
  i824.lightProbeUsage = i825[16]
  i824.reflectionProbeUsage = i825[17]
  return i824
}

Deserializers["Spine.Unity.SkeletonAnimation"] = function (request, data, root) {
  var i828 = root || request.c( 'Spine.Unity.SkeletonAnimation' )
  var i829 = data
  i828.loop = !!i829[0]
  i828.timeScale = i829[1]
  request.r(i829[2], i829[3], 0, i828, 'skeletonDataAsset')
  i828.initialSkinName = i829[4]
  i828.fixPrefabOverrideViaMeshFilter = i829[5]
  i828.initialFlipX = !!i829[6]
  i828.initialFlipY = !!i829[7]
  i828.updateWhenInvisible = i829[8]
  i828.zSpacing = i829[9]
  i828.useClipping = !!i829[10]
  i828.immutableTriangles = !!i829[11]
  i828.pmaVertexColors = !!i829[12]
  i828.clearStateOnDisable = !!i829[13]
  i828.tintBlack = !!i829[14]
  i828.singleSubmesh = !!i829[15]
  i828.fixDrawOrder = !!i829[16]
  i828.addNormals = !!i829[17]
  i828.calculateTangents = !!i829[18]
  i828.maskInteraction = i829[19]
  i828.maskMaterials = request.d('Spine.Unity.SkeletonRenderer+SpriteMaskInteractionMaterials', i829[20], i828.maskMaterials)
  i828.disableRenderingOnOverride = !!i829[21]
  i828.updateTiming = i829[22]
  i828.unscaledTime = !!i829[23]
  i828._animationName = i829[24]
  var i831 = i829[25]
  var i830 = []
  for(var i = 0; i < i831.length; i += 1) {
    i830.push( i831[i + 0] );
  }
  i828.separatorSlotNames = i830
  i828.physicsPositionInheritanceFactor = new pc.Vec2( i829[26], i829[27] )
  i828.physicsRotationInheritanceFactor = i829[28]
  request.r(i829[29], i829[30], 0, i828, 'physicsMovementRelativeTo')
  return i828
}

Deserializers["Spine.Unity.SkeletonRenderer+SpriteMaskInteractionMaterials"] = function (request, data, root) {
  var i832 = root || request.c( 'Spine.Unity.SkeletonRenderer+SpriteMaskInteractionMaterials' )
  var i833 = data
  var i835 = i833[0]
  var i834 = []
  for(var i = 0; i < i835.length; i += 2) {
  request.r(i835[i + 0], i835[i + 1], 2, i834, '')
  }
  i832.materialsMaskDisabled = i834
  var i837 = i833[1]
  var i836 = []
  for(var i = 0; i < i837.length; i += 2) {
  request.r(i837[i + 0], i837[i + 1], 2, i836, '')
  }
  i832.materialsInsideMask = i836
  var i839 = i833[2]
  var i838 = []
  for(var i = 0; i < i839.length; i += 2) {
  request.r(i839[i + 0], i839[i + 1], 2, i838, '')
  }
  i832.materialsOutsideMask = i838
  return i832
}

Deserializers["Character"] = function (request, data, root) {
  var i842 = root || request.c( 'Character' )
  var i843 = data
  var i845 = i843[0]
  var i844 = new (System.Collections.Generic.List$1(Bridge.ns('System.String')))
  for(var i = 0; i < i845.length; i += 1) {
    i844.add(i845[i + 0]);
  }
  i842.currentAppliedSkinNames = i844
  request.r(i843[1], i843[2], 0, i842, 'tf')
  request.r(i843[3], i843[4], 0, i842, 'skeletonAnimation')
  var i847 = i843[5]
  var i846 = new (System.Collections.Generic.List$1(Bridge.ns('SlotAttachmentPair')))
  for(var i = 0; i < i847.length; i += 1) {
    i846.add(request.d('SlotAttachmentPair', i847[i + 0]));
  }
  i842.currentAppliedPairs = i846
  return i842
}

Deserializers["SlotAttachmentPair"] = function (request, data, root) {
  var i852 = root || request.c( 'SlotAttachmentPair' )
  var i853 = data
  i852.isEnabled = !!i853[0]
  i852.slotName = i853[1]
  i852.attachmentName = i853[2]
  request.r(i853[3], i853[4], 0, i852, 'skeletonDataAsset')
  return i852
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i854 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i855 = data
  i854.pivot = new pc.Vec2( i855[0], i855[1] )
  i854.anchorMin = new pc.Vec2( i855[2], i855[3] )
  i854.anchorMax = new pc.Vec2( i855[4], i855[5] )
  i854.sizeDelta = new pc.Vec2( i855[6], i855[7] )
  i854.anchoredPosition3D = new pc.Vec3( i855[8], i855[9], i855[10] )
  i854.rotation = new pc.Quat(i855[11], i855[12], i855[13], i855[14])
  i854.scale = new pc.Vec3( i855[15], i855[16], i855[17] )
  return i854
}

Deserializers["TMPro.TextMeshPro"] = function (request, data, root) {
  var i856 = root || request.c( 'TMPro.TextMeshPro' )
  var i857 = data
  i856._SortingLayer = i857[0]
  i856._SortingLayerID = i857[1]
  i856._SortingOrder = i857[2]
  i856.m_hasFontAssetChanged = !!i857[3]
  request.r(i857[4], i857[5], 0, i856, 'm_renderer')
  i856.m_maskType = i857[6]
  i856.m_text = i857[7]
  i856.m_isRightToLeft = !!i857[8]
  request.r(i857[9], i857[10], 0, i856, 'm_fontAsset')
  request.r(i857[11], i857[12], 0, i856, 'm_sharedMaterial')
  var i859 = i857[13]
  var i858 = []
  for(var i = 0; i < i859.length; i += 2) {
  request.r(i859[i + 0], i859[i + 1], 2, i858, '')
  }
  i856.m_fontSharedMaterials = i858
  request.r(i857[14], i857[15], 0, i856, 'm_fontMaterial')
  var i861 = i857[16]
  var i860 = []
  for(var i = 0; i < i861.length; i += 2) {
  request.r(i861[i + 0], i861[i + 1], 2, i860, '')
  }
  i856.m_fontMaterials = i860
  i856.m_fontColor32 = UnityEngine.Color32.ConstructColor(i857[17], i857[18], i857[19], i857[20])
  i856.m_fontColor = new pc.Color(i857[21], i857[22], i857[23], i857[24])
  i856.m_enableVertexGradient = !!i857[25]
  i856.m_colorMode = i857[26]
  i856.m_fontColorGradient = request.d('TMPro.VertexGradient', i857[27], i856.m_fontColorGradient)
  request.r(i857[28], i857[29], 0, i856, 'm_fontColorGradientPreset')
  request.r(i857[30], i857[31], 0, i856, 'm_spriteAsset')
  i856.m_tintAllSprites = !!i857[32]
  request.r(i857[33], i857[34], 0, i856, 'm_StyleSheet')
  i856.m_TextStyleHashCode = i857[35]
  i856.m_overrideHtmlColors = !!i857[36]
  i856.m_faceColor = UnityEngine.Color32.ConstructColor(i857[37], i857[38], i857[39], i857[40])
  i856.m_fontSize = i857[41]
  i856.m_fontSizeBase = i857[42]
  i856.m_fontWeight = i857[43]
  i856.m_enableAutoSizing = !!i857[44]
  i856.m_fontSizeMin = i857[45]
  i856.m_fontSizeMax = i857[46]
  i856.m_fontStyle = i857[47]
  i856.m_HorizontalAlignment = i857[48]
  i856.m_VerticalAlignment = i857[49]
  i856.m_textAlignment = i857[50]
  i856.m_characterSpacing = i857[51]
  i856.m_wordSpacing = i857[52]
  i856.m_lineSpacing = i857[53]
  i856.m_lineSpacingMax = i857[54]
  i856.m_paragraphSpacing = i857[55]
  i856.m_charWidthMaxAdj = i857[56]
  i856.m_TextWrappingMode = i857[57]
  i856.m_wordWrappingRatios = i857[58]
  i856.m_overflowMode = i857[59]
  request.r(i857[60], i857[61], 0, i856, 'm_linkedTextComponent')
  request.r(i857[62], i857[63], 0, i856, 'parentLinkedComponent')
  i856.m_enableKerning = !!i857[64]
  var i863 = i857[65]
  var i862 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i863.length; i += 1) {
    i862.add(i863[i + 0]);
  }
  i856.m_ActiveFontFeatures = i862
  i856.m_enableExtraPadding = !!i857[66]
  i856.checkPaddingRequired = !!i857[67]
  i856.m_isRichText = !!i857[68]
  i856.m_parseCtrlCharacters = !!i857[69]
  i856.m_isOrthographic = !!i857[70]
  i856.m_isCullingEnabled = !!i857[71]
  i856.m_horizontalMapping = i857[72]
  i856.m_verticalMapping = i857[73]
  i856.m_uvLineOffset = i857[74]
  i856.m_geometrySortingOrder = i857[75]
  i856.m_IsTextObjectScaleStatic = !!i857[76]
  i856.m_VertexBufferAutoSizeReduction = !!i857[77]
  i856.m_useMaxVisibleDescender = !!i857[78]
  i856.m_pageToDisplay = i857[79]
  i856.m_margin = new pc.Vec4( i857[80], i857[81], i857[82], i857[83] )
  i856.m_isUsingLegacyAnimationComponent = !!i857[84]
  i856.m_isVolumetricText = !!i857[85]
  request.r(i857[86], i857[87], 0, i856, 'm_Material')
  i856.m_EmojiFallbackSupport = !!i857[88]
  i856.m_Maskable = !!i857[89]
  i856.m_Color = new pc.Color(i857[90], i857[91], i857[92], i857[93])
  i856.m_RaycastTarget = !!i857[94]
  i856.m_RaycastPadding = new pc.Vec4( i857[95], i857[96], i857[97], i857[98] )
  return i856
}

Deserializers["TMPro.VertexGradient"] = function (request, data, root) {
  var i864 = root || request.c( 'TMPro.VertexGradient' )
  var i865 = data
  i864.topLeft = new pc.Color(i865[0], i865[1], i865[2], i865[3])
  i864.topRight = new pc.Color(i865[4], i865[5], i865[6], i865[7])
  i864.bottomLeft = new pc.Color(i865[8], i865[9], i865[10], i865[11])
  i864.bottomRight = new pc.Color(i865[12], i865[13], i865[14], i865[15])
  return i864
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i868 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i869 = data
  request.r(i869[0], i869[1], 0, i868, 'm_FirstSelected')
  i868.m_sendNavigationEvents = !!i869[2]
  i868.m_DragThreshold = i869[3]
  return i868
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i870 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i871 = data
  i870.m_HorizontalAxis = i871[0]
  i870.m_VerticalAxis = i871[1]
  i870.m_SubmitButton = i871[2]
  i870.m_CancelButton = i871[3]
  i870.m_InputActionsPerSecond = i871[4]
  i870.m_RepeatDelay = i871[5]
  i870.m_ForceModuleActive = !!i871[6]
  i870.m_SendPointerHoverToParent = !!i871[7]
  return i870
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i872 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i873 = data
  i872.ambientIntensity = i873[0]
  i872.reflectionIntensity = i873[1]
  i872.ambientMode = i873[2]
  i872.ambientLight = new pc.Color(i873[3], i873[4], i873[5], i873[6])
  i872.ambientSkyColor = new pc.Color(i873[7], i873[8], i873[9], i873[10])
  i872.ambientGroundColor = new pc.Color(i873[11], i873[12], i873[13], i873[14])
  i872.ambientEquatorColor = new pc.Color(i873[15], i873[16], i873[17], i873[18])
  i872.fogColor = new pc.Color(i873[19], i873[20], i873[21], i873[22])
  i872.fogEndDistance = i873[23]
  i872.fogStartDistance = i873[24]
  i872.fogDensity = i873[25]
  i872.fog = !!i873[26]
  request.r(i873[27], i873[28], 0, i872, 'skybox')
  i872.fogMode = i873[29]
  var i875 = i873[30]
  var i874 = []
  for(var i = 0; i < i875.length; i += 1) {
    i874.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i875[i + 0]) );
  }
  i872.lightmaps = i874
  i872.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i873[31], i872.lightProbes)
  i872.lightmapsMode = i873[32]
  i872.mixedBakeMode = i873[33]
  i872.environmentLightingMode = i873[34]
  i872.ambientProbe = new pc.SphericalHarmonicsL2(i873[35])
  i872.referenceAmbientProbe = new pc.SphericalHarmonicsL2(i873[36])
  i872.useReferenceAmbientProbe = !!i873[37]
  request.r(i873[38], i873[39], 0, i872, 'customReflection')
  request.r(i873[40], i873[41], 0, i872, 'defaultReflection')
  i872.defaultReflectionMode = i873[42]
  i872.defaultReflectionResolution = i873[43]
  i872.sunLightObjectId = i873[44]
  i872.pixelLightCount = i873[45]
  i872.defaultReflectionHDR = !!i873[46]
  i872.hasLightDataAsset = !!i873[47]
  i872.hasManualGenerate = !!i873[48]
  return i872
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i878 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i879 = data
  request.r(i879[0], i879[1], 0, i878, 'lightmapColor')
  request.r(i879[2], i879[3], 0, i878, 'lightmapDirection')
  request.r(i879[4], i879[5], 0, i878, 'shadowMask')
  return i878
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i880 = root || new UnityEngine.LightProbes()
  var i881 = data
  return i880
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i888 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i889 = data
  var i891 = i889[0]
  var i890 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i891.length; i += 1) {
    i890.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i891[i + 0]));
  }
  i888.ShaderCompilationErrors = i890
  i888.name = i889[1]
  i888.guid = i889[2]
  var i893 = i889[3]
  var i892 = []
  for(var i = 0; i < i893.length; i += 1) {
    i892.push( i893[i + 0] );
  }
  i888.shaderDefinedKeywords = i892
  var i895 = i889[4]
  var i894 = []
  for(var i = 0; i < i895.length; i += 1) {
    i894.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i895[i + 0]) );
  }
  i888.passes = i894
  var i897 = i889[5]
  var i896 = []
  for(var i = 0; i < i897.length; i += 1) {
    i896.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i897[i + 0]) );
  }
  i888.usePasses = i896
  var i899 = i889[6]
  var i898 = []
  for(var i = 0; i < i899.length; i += 1) {
    i898.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i899[i + 0]) );
  }
  i888.defaultParameterValues = i898
  request.r(i889[7], i889[8], 0, i888, 'unityFallbackShader')
  i888.readDepth = !!i889[9]
  i888.hasDepthOnlyPass = !!i889[10]
  i888.isCreatedByShaderGraph = !!i889[11]
  i888.disableBatching = !!i889[12]
  i888.compiled = !!i889[13]
  return i888
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i902 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i903 = data
  i902.shaderName = i903[0]
  i902.errorMessage = i903[1]
  return i902
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i906 = root || new pc.UnityShaderPass()
  var i907 = data
  i906.id = i907[0]
  i906.subShaderIndex = i907[1]
  i906.name = i907[2]
  i906.passType = i907[3]
  i906.grabPassTextureName = i907[4]
  i906.usePass = !!i907[5]
  i906.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i907[6], i906.zTest)
  i906.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i907[7], i906.zWrite)
  i906.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i907[8], i906.culling)
  i906.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i907[9], i906.blending)
  i906.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i907[10], i906.alphaBlending)
  i906.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i907[11], i906.colorWriteMask)
  i906.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i907[12], i906.offsetUnits)
  i906.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i907[13], i906.offsetFactor)
  i906.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i907[14], i906.stencilRef)
  i906.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i907[15], i906.stencilReadMask)
  i906.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i907[16], i906.stencilWriteMask)
  i906.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i907[17], i906.stencilOp)
  i906.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i907[18], i906.stencilOpFront)
  i906.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i907[19], i906.stencilOpBack)
  var i909 = i907[20]
  var i908 = []
  for(var i = 0; i < i909.length; i += 1) {
    i908.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i909[i + 0]) );
  }
  i906.tags = i908
  var i911 = i907[21]
  var i910 = []
  for(var i = 0; i < i911.length; i += 1) {
    i910.push( i911[i + 0] );
  }
  i906.passDefinedKeywords = i910
  var i913 = i907[22]
  var i912 = []
  for(var i = 0; i < i913.length; i += 1) {
    i912.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i913[i + 0]) );
  }
  i906.passDefinedKeywordGroups = i912
  var i915 = i907[23]
  var i914 = []
  for(var i = 0; i < i915.length; i += 1) {
    i914.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i915[i + 0]) );
  }
  i906.variants = i914
  var i917 = i907[24]
  var i916 = []
  for(var i = 0; i < i917.length; i += 1) {
    i916.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i917[i + 0]) );
  }
  i906.excludedVariants = i916
  i906.hasDepthReader = !!i907[25]
  return i906
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i918 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i919 = data
  i918.val = i919[0]
  i918.name = i919[1]
  return i918
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i920 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i921 = data
  i920.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i921[0], i920.src)
  i920.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i921[1], i920.dst)
  i920.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i921[2], i920.op)
  return i920
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i922 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i923 = data
  i922.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i923[0], i922.pass)
  i922.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i923[1], i922.fail)
  i922.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i923[2], i922.zFail)
  i922.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i923[3], i922.comp)
  return i922
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i926 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i927 = data
  i926.name = i927[0]
  i926.value = i927[1]
  return i926
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i930 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i931 = data
  var i933 = i931[0]
  var i932 = []
  for(var i = 0; i < i933.length; i += 1) {
    i932.push( i933[i + 0] );
  }
  i930.keywords = i932
  i930.hasDiscard = !!i931[1]
  return i930
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i936 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i937 = data
  i936.passId = i937[0]
  i936.subShaderIndex = i937[1]
  var i939 = i937[2]
  var i938 = []
  for(var i = 0; i < i939.length; i += 1) {
    i938.push( i939[i + 0] );
  }
  i936.keywords = i938
  i936.vertexProgram = i937[3]
  i936.fragmentProgram = i937[4]
  i936.exportedForWebGl2 = !!i937[5]
  i936.readDepth = !!i937[6]
  return i936
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i942 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i943 = data
  request.r(i943[0], i943[1], 0, i942, 'shader')
  i942.pass = i943[2]
  return i942
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i946 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i947 = data
  i946.name = i947[0]
  i946.type = i947[1]
  i946.value = new pc.Vec4( i947[2], i947[3], i947[4], i947[5] )
  i946.textureValue = i947[6]
  i946.shaderPropertyFlag = i947[7]
  return i946
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i948 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i949 = data
  i948.name = i949[0]
  request.r(i949[1], i949[2], 0, i948, 'texture')
  i948.aabb = i949[3]
  i948.vertices = i949[4]
  i948.triangles = i949[5]
  i948.textureRect = UnityEngine.Rect.MinMaxRect(i949[6], i949[7], i949[8], i949[9])
  i948.packedRect = UnityEngine.Rect.MinMaxRect(i949[10], i949[11], i949[12], i949[13])
  i948.border = new pc.Vec4( i949[14], i949[15], i949[16], i949[17] )
  i948.transparency = i949[18]
  i948.bounds = i949[19]
  i948.pixelsPerUnit = i949[20]
  i948.textureWidth = i949[21]
  i948.textureHeight = i949[22]
  i948.nativeSize = new pc.Vec2( i949[23], i949[24] )
  i948.pivot = new pc.Vec2( i949[25], i949[26] )
  i948.textureRectOffset = new pc.Vec2( i949[27], i949[28] )
  return i948
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i950 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i951 = data
  i950.name = i951[0]
  return i950
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip"] = function (request, data, root) {
  var i952 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip' )
  var i953 = data
  i952.name = i953[0]
  i952.wrapMode = i953[1]
  i952.isLooping = !!i953[2]
  i952.length = i953[3]
  var i955 = i953[4]
  var i954 = []
  for(var i = 0; i < i955.length; i += 1) {
    i954.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve', i955[i + 0]) );
  }
  i952.curves = i954
  var i957 = i953[5]
  var i956 = []
  for(var i = 0; i < i957.length; i += 1) {
    i956.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent', i957[i + 0]) );
  }
  i952.events = i956
  i952.halfPrecision = !!i953[6]
  i952._frameRate = i953[7]
  i952.localBounds = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds', i953[8], i952.localBounds)
  i952.hasMuscleCurves = !!i953[9]
  var i959 = i953[10]
  var i958 = []
  for(var i = 0; i < i959.length; i += 1) {
    i958.push( i959[i + 0] );
  }
  i952.clipMuscleConstant = i958
  i952.clipBindingConstant = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant', i953[11], i952.clipBindingConstant)
  return i952
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve"] = function (request, data, root) {
  var i962 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve' )
  var i963 = data
  i962.path = i963[0]
  i962.hash = i963[1]
  i962.componentType = i963[2]
  i962.property = i963[3]
  i962.keys = i963[4]
  var i965 = i963[5]
  var i964 = []
  for(var i = 0; i < i965.length; i += 1) {
    i964.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey', i965[i + 0]) );
  }
  i962.objectReferenceKeys = i964
  return i962
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey"] = function (request, data, root) {
  var i968 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey' )
  var i969 = data
  i968.time = i969[0]
  request.r(i969[1], i969[2], 0, i968, 'value')
  return i968
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent"] = function (request, data, root) {
  var i972 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent' )
  var i973 = data
  i972.functionName = i973[0]
  i972.floatParameter = i973[1]
  i972.intParameter = i973[2]
  i972.stringParameter = i973[3]
  request.r(i973[4], i973[5], 0, i972, 'objectReferenceParameter')
  i972.time = i973[6]
  return i972
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds"] = function (request, data, root) {
  var i974 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds' )
  var i975 = data
  i974.center = new pc.Vec3( i975[0], i975[1], i975[2] )
  i974.extends = new pc.Vec3( i975[3], i975[4], i975[5] )
  return i974
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant"] = function (request, data, root) {
  var i978 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant' )
  var i979 = data
  var i981 = i979[0]
  var i980 = []
  for(var i = 0; i < i981.length; i += 1) {
    i980.push( i981[i + 0] );
  }
  i978.genericBindings = i980
  var i983 = i979[1]
  var i982 = []
  for(var i = 0; i < i983.length; i += 1) {
    i982.push( i983[i + 0] );
  }
  i978.pptrCurveMapping = i982
  return i978
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i984 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i985 = data
  i984.name = i985[0]
  i984.ascent = i985[1]
  i984.originalLineHeight = i985[2]
  i984.fontSize = i985[3]
  var i987 = i985[4]
  var i986 = []
  for(var i = 0; i < i987.length; i += 1) {
    i986.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i987[i + 0]) );
  }
  i984.characterInfo = i986
  request.r(i985[5], i985[6], 0, i984, 'texture')
  i984.originalFontSize = i985[7]
  return i984
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i990 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i991 = data
  i990.index = i991[0]
  i990.advance = i991[1]
  i990.bearing = i991[2]
  i990.glyphWidth = i991[3]
  i990.glyphHeight = i991[4]
  i990.minX = i991[5]
  i990.maxX = i991[6]
  i990.minY = i991[7]
  i990.maxY = i991[8]
  i990.uvBottomLeftX = i991[9]
  i990.uvBottomLeftY = i991[10]
  i990.uvBottomRightX = i991[11]
  i990.uvBottomRightY = i991[12]
  i990.uvTopLeftX = i991[13]
  i990.uvTopLeftY = i991[14]
  i990.uvTopRightX = i991[15]
  i990.uvTopRightY = i991[16]
  return i990
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController"] = function (request, data, root) {
  var i992 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController' )
  var i993 = data
  i992.name = i993[0]
  var i995 = i993[1]
  var i994 = []
  for(var i = 0; i < i995.length; i += 1) {
    i994.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer', i995[i + 0]) );
  }
  i992.layers = i994
  var i997 = i993[2]
  var i996 = []
  for(var i = 0; i < i997.length; i += 1) {
    i996.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter', i997[i + 0]) );
  }
  i992.parameters = i996
  i992.animationClips = i993[3]
  i992.avatarUnsupported = i993[4]
  return i992
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer"] = function (request, data, root) {
  var i1000 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer' )
  var i1001 = data
  i1000.name = i1001[0]
  i1000.defaultWeight = i1001[1]
  i1000.blendingMode = i1001[2]
  i1000.avatarMask = i1001[3]
  i1000.syncedLayerIndex = i1001[4]
  i1000.syncedLayerAffectsTiming = !!i1001[5]
  i1000.syncedLayers = i1001[6]
  i1000.stateMachine = request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i1001[7], i1000.stateMachine)
  return i1000
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine"] = function (request, data, root) {
  var i1002 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine' )
  var i1003 = data
  i1002.id = i1003[0]
  i1002.name = i1003[1]
  i1002.path = i1003[2]
  var i1005 = i1003[3]
  var i1004 = []
  for(var i = 0; i < i1005.length; i += 1) {
    i1004.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState', i1005[i + 0]) );
  }
  i1002.states = i1004
  var i1007 = i1003[4]
  var i1006 = []
  for(var i = 0; i < i1007.length; i += 1) {
    i1006.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i1007[i + 0]) );
  }
  i1002.machines = i1006
  var i1009 = i1003[5]
  var i1008 = []
  for(var i = 0; i < i1009.length; i += 1) {
    i1008.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i1009[i + 0]) );
  }
  i1002.entryStateTransitions = i1008
  var i1011 = i1003[6]
  var i1010 = []
  for(var i = 0; i < i1011.length; i += 1) {
    i1010.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i1011[i + 0]) );
  }
  i1002.exitStateTransitions = i1010
  var i1013 = i1003[7]
  var i1012 = []
  for(var i = 0; i < i1013.length; i += 1) {
    i1012.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i1013[i + 0]) );
  }
  i1002.anyStateTransitions = i1012
  i1002.defaultStateId = i1003[8]
  return i1002
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState"] = function (request, data, root) {
  var i1016 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState' )
  var i1017 = data
  i1016.id = i1017[0]
  i1016.name = i1017[1]
  i1016.cycleOffset = i1017[2]
  i1016.cycleOffsetParameter = i1017[3]
  i1016.cycleOffsetParameterActive = !!i1017[4]
  i1016.mirror = !!i1017[5]
  i1016.mirrorParameter = i1017[6]
  i1016.mirrorParameterActive = !!i1017[7]
  i1016.motionId = i1017[8]
  i1016.nameHash = i1017[9]
  i1016.fullPathHash = i1017[10]
  i1016.speed = i1017[11]
  i1016.speedParameter = i1017[12]
  i1016.speedParameterActive = !!i1017[13]
  i1016.tag = i1017[14]
  i1016.tagHash = i1017[15]
  i1016.writeDefaultValues = !!i1017[16]
  var i1019 = i1017[17]
  var i1018 = []
  for(var i = 0; i < i1019.length; i += 2) {
  request.r(i1019[i + 0], i1019[i + 1], 2, i1018, '')
  }
  i1016.behaviours = i1018
  var i1021 = i1017[18]
  var i1020 = []
  for(var i = 0; i < i1021.length; i += 1) {
    i1020.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i1021[i + 0]) );
  }
  i1016.transitions = i1020
  return i1016
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition"] = function (request, data, root) {
  var i1026 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition' )
  var i1027 = data
  i1026.fullPath = i1027[0]
  i1026.canTransitionToSelf = !!i1027[1]
  i1026.duration = i1027[2]
  i1026.exitTime = i1027[3]
  i1026.hasExitTime = !!i1027[4]
  i1026.hasFixedDuration = !!i1027[5]
  i1026.interruptionSource = i1027[6]
  i1026.offset = i1027[7]
  i1026.orderedInterruption = !!i1027[8]
  i1026.destinationStateId = i1027[9]
  i1026.isExit = !!i1027[10]
  i1026.mute = !!i1027[11]
  i1026.solo = !!i1027[12]
  var i1029 = i1027[13]
  var i1028 = []
  for(var i = 0; i < i1029.length; i += 1) {
    i1028.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i1029[i + 0]) );
  }
  i1026.conditions = i1028
  return i1026
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition"] = function (request, data, root) {
  var i1034 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition' )
  var i1035 = data
  i1034.destinationStateId = i1035[0]
  i1034.isExit = !!i1035[1]
  i1034.mute = !!i1035[2]
  i1034.solo = !!i1035[3]
  var i1037 = i1035[4]
  var i1036 = []
  for(var i = 0; i < i1037.length; i += 1) {
    i1036.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i1037[i + 0]) );
  }
  i1034.conditions = i1036
  return i1034
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter"] = function (request, data, root) {
  var i1040 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter' )
  var i1041 = data
  i1040.defaultBool = !!i1041[0]
  i1040.defaultFloat = i1041[1]
  i1040.defaultInt = i1041[2]
  i1040.name = i1041[3]
  i1040.nameHash = i1041[4]
  i1040.type = i1041[5]
  return i1040
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i1042 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i1043 = data
  i1042.name = i1043[0]
  i1042.bytes64 = i1043[1]
  i1042.data = i1043[2]
  return i1042
}

Deserializers["Spine.Unity.SkeletonDataAsset"] = function (request, data, root) {
  var i1044 = root || request.c( 'Spine.Unity.SkeletonDataAsset' )
  var i1045 = data
  var i1047 = i1045[0]
  var i1046 = []
  for(var i = 0; i < i1047.length; i += 2) {
  request.r(i1047[i + 0], i1047[i + 1], 2, i1046, '')
  }
  i1044.atlasAssets = i1046
  i1044.scale = i1045[1]
  request.r(i1045[2], i1045[3], 0, i1044, 'skeletonJSON')
  i1044.isUpgradingBlendModeMaterials = !!i1045[4]
  i1044.blendModeMaterials = request.d('Spine.Unity.BlendModeMaterials', i1045[5], i1044.blendModeMaterials)
  var i1049 = i1045[6]
  var i1048 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.SkeletonDataModifierAsset')))
  for(var i = 0; i < i1049.length; i += 2) {
  request.r(i1049[i + 0], i1049[i + 1], 1, i1048, '')
  }
  i1044.skeletonDataModifiers = i1048
  var i1051 = i1045[7]
  var i1050 = []
  for(var i = 0; i < i1051.length; i += 1) {
    i1050.push( i1051[i + 0] );
  }
  i1044.fromAnimation = i1050
  var i1053 = i1045[8]
  var i1052 = []
  for(var i = 0; i < i1053.length; i += 1) {
    i1052.push( i1053[i + 0] );
  }
  i1044.toAnimation = i1052
  i1044.duration = i1045[9]
  i1044.defaultMix = i1045[10]
  request.r(i1045[11], i1045[12], 0, i1044, 'controller')
  return i1044
}

Deserializers["Spine.Unity.BlendModeMaterials"] = function (request, data, root) {
  var i1056 = root || request.c( 'Spine.Unity.BlendModeMaterials' )
  var i1057 = data
  i1056.applyAdditiveMaterial = !!i1057[0]
  var i1059 = i1057[1]
  var i1058 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.BlendModeMaterials+ReplacementMaterial')))
  for(var i = 0; i < i1059.length; i += 1) {
    i1058.add(request.d('Spine.Unity.BlendModeMaterials+ReplacementMaterial', i1059[i + 0]));
  }
  i1056.additiveMaterials = i1058
  var i1061 = i1057[2]
  var i1060 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.BlendModeMaterials+ReplacementMaterial')))
  for(var i = 0; i < i1061.length; i += 1) {
    i1060.add(request.d('Spine.Unity.BlendModeMaterials+ReplacementMaterial', i1061[i + 0]));
  }
  i1056.multiplyMaterials = i1060
  var i1063 = i1057[3]
  var i1062 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.BlendModeMaterials+ReplacementMaterial')))
  for(var i = 0; i < i1063.length; i += 1) {
    i1062.add(request.d('Spine.Unity.BlendModeMaterials+ReplacementMaterial', i1063[i + 0]));
  }
  i1056.screenMaterials = i1062
  i1056.requiresBlendModeMaterials = !!i1057[4]
  return i1056
}

Deserializers["Spine.Unity.BlendModeMaterials+ReplacementMaterial"] = function (request, data, root) {
  var i1066 = root || request.c( 'Spine.Unity.BlendModeMaterials+ReplacementMaterial' )
  var i1067 = data
  i1066.pageName = i1067[0]
  request.r(i1067[1], i1067[2], 0, i1066, 'material')
  return i1066
}

Deserializers["Spine.Unity.SpineAtlasAsset"] = function (request, data, root) {
  var i1070 = root || request.c( 'Spine.Unity.SpineAtlasAsset' )
  var i1071 = data
  request.r(i1071[0], i1071[1], 0, i1070, 'atlasFile')
  var i1073 = i1071[2]
  var i1072 = []
  for(var i = 0; i < i1073.length; i += 2) {
  request.r(i1073[i + 0], i1073[i + 1], 2, i1072, '')
  }
  i1070.materials = i1072
  i1070.textureLoadingMode = i1071[3]
  request.r(i1071[4], i1071[5], 0, i1070, 'onDemandTextureLoader')
  return i1070
}

Deserializers["SlotDataSO"] = function (request, data, root) {
  var i1074 = root || request.c( 'SlotDataSO' )
  var i1075 = data
  i1074.slotName = i1075[0]
  request.r(i1075[1], i1075[2], 0, i1074, 'leftItemSprite')
  request.r(i1075[3], i1075[4], 0, i1074, 'rightItemSprite')
  return i1074
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i1076 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i1077 = data
  i1076.normalStyle = i1077[0]
  i1076.normalSpacingOffset = i1077[1]
  i1076.boldStyle = i1077[2]
  i1076.boldSpacing = i1077[3]
  i1076.italicStyle = i1077[4]
  i1076.tabSize = i1077[5]
  request.r(i1077[6], i1077[7], 0, i1076, 'atlas')
  i1076.m_SourceFontFileGUID = i1077[8]
  i1076.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i1077[9], i1076.m_CreationSettings)
  request.r(i1077[10], i1077[11], 0, i1076, 'm_SourceFontFile')
  i1076.m_SourceFontFilePath = i1077[12]
  i1076.m_AtlasPopulationMode = i1077[13]
  i1076.InternalDynamicOS = !!i1077[14]
  var i1079 = i1077[15]
  var i1078 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i1079.length; i += 1) {
    i1078.add(request.d('UnityEngine.TextCore.Glyph', i1079[i + 0]));
  }
  i1076.m_GlyphTable = i1078
  var i1081 = i1077[16]
  var i1080 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i1081.length; i += 1) {
    i1080.add(request.d('TMPro.TMP_Character', i1081[i + 0]));
  }
  i1076.m_CharacterTable = i1080
  var i1083 = i1077[17]
  var i1082 = []
  for(var i = 0; i < i1083.length; i += 2) {
  request.r(i1083[i + 0], i1083[i + 1], 2, i1082, '')
  }
  i1076.m_AtlasTextures = i1082
  i1076.m_AtlasTextureIndex = i1077[18]
  i1076.m_IsMultiAtlasTexturesEnabled = !!i1077[19]
  i1076.m_GetFontFeatures = !!i1077[20]
  i1076.m_ClearDynamicDataOnBuild = !!i1077[21]
  i1076.m_AtlasWidth = i1077[22]
  i1076.m_AtlasHeight = i1077[23]
  i1076.m_AtlasPadding = i1077[24]
  i1076.m_AtlasRenderMode = i1077[25]
  var i1085 = i1077[26]
  var i1084 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i1085.length; i += 1) {
    i1084.add(request.d('UnityEngine.TextCore.GlyphRect', i1085[i + 0]));
  }
  i1076.m_UsedGlyphRects = i1084
  var i1087 = i1077[27]
  var i1086 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i1087.length; i += 1) {
    i1086.add(request.d('UnityEngine.TextCore.GlyphRect', i1087[i + 0]));
  }
  i1076.m_FreeGlyphRects = i1086
  i1076.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i1077[28], i1076.m_FontFeatureTable)
  i1076.m_ShouldReimportFontFeatures = !!i1077[29]
  var i1089 = i1077[30]
  var i1088 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1089.length; i += 2) {
  request.r(i1089[i + 0], i1089[i + 1], 1, i1088, '')
  }
  i1076.m_FallbackFontAssetTable = i1088
  var i1091 = i1077[31]
  var i1090 = []
  for(var i = 0; i < i1091.length; i += 1) {
    i1090.push( request.d('TMPro.TMP_FontWeightPair', i1091[i + 0]) );
  }
  i1076.m_FontWeightTable = i1090
  var i1093 = i1077[32]
  var i1092 = []
  for(var i = 0; i < i1093.length; i += 1) {
    i1092.push( request.d('TMPro.TMP_FontWeightPair', i1093[i + 0]) );
  }
  i1076.fontWeights = i1092
  i1076.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i1077[33], i1076.m_fontInfo)
  var i1095 = i1077[34]
  var i1094 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i1095.length; i += 1) {
    i1094.add(request.d('TMPro.TMP_Glyph', i1095[i + 0]));
  }
  i1076.m_glyphInfoList = i1094
  i1076.m_KerningTable = request.d('TMPro.KerningTable', i1077[35], i1076.m_KerningTable)
  var i1097 = i1077[36]
  var i1096 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1097.length; i += 2) {
  request.r(i1097[i + 0], i1097[i + 1], 1, i1096, '')
  }
  i1076.fallbackFontAssets = i1096
  i1076.m_Version = i1077[37]
  i1076.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i1077[38], i1076.m_FaceInfo)
  request.r(i1077[39], i1077[40], 0, i1076, 'm_Material')
  return i1076
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i1098 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i1099 = data
  i1098.sourceFontFileName = i1099[0]
  i1098.sourceFontFileGUID = i1099[1]
  i1098.faceIndex = i1099[2]
  i1098.pointSizeSamplingMode = i1099[3]
  i1098.pointSize = i1099[4]
  i1098.padding = i1099[5]
  i1098.paddingMode = i1099[6]
  i1098.packingMode = i1099[7]
  i1098.atlasWidth = i1099[8]
  i1098.atlasHeight = i1099[9]
  i1098.characterSetSelectionMode = i1099[10]
  i1098.characterSequence = i1099[11]
  i1098.referencedFontAssetGUID = i1099[12]
  i1098.referencedTextAssetGUID = i1099[13]
  i1098.fontStyle = i1099[14]
  i1098.fontStyleModifier = i1099[15]
  i1098.renderMode = i1099[16]
  i1098.includeFontFeatures = !!i1099[17]
  return i1098
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i1102 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i1103 = data
  i1102.m_Index = i1103[0]
  i1102.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i1103[1], i1102.m_Metrics)
  i1102.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i1103[2], i1102.m_GlyphRect)
  i1102.m_Scale = i1103[3]
  i1102.m_AtlasIndex = i1103[4]
  i1102.m_ClassDefinitionType = i1103[5]
  return i1102
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i1104 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i1105 = data
  i1104.m_Width = i1105[0]
  i1104.m_Height = i1105[1]
  i1104.m_HorizontalBearingX = i1105[2]
  i1104.m_HorizontalBearingY = i1105[3]
  i1104.m_HorizontalAdvance = i1105[4]
  return i1104
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i1106 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i1107 = data
  i1106.m_X = i1107[0]
  i1106.m_Y = i1107[1]
  i1106.m_Width = i1107[2]
  i1106.m_Height = i1107[3]
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

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i1116 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i1117 = data
  var i1119 = i1117[0]
  var i1118 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i1119.length; i += 1) {
    i1118.add(request.d('TMPro.MultipleSubstitutionRecord', i1119[i + 0]));
  }
  i1116.m_MultipleSubstitutionRecords = i1118
  var i1121 = i1117[1]
  var i1120 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i1121.length; i += 1) {
    i1120.add(request.d('TMPro.LigatureSubstitutionRecord', i1121[i + 0]));
  }
  i1116.m_LigatureSubstitutionRecords = i1120
  var i1123 = i1117[2]
  var i1122 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i1123.length; i += 1) {
    i1122.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i1123[i + 0]));
  }
  i1116.m_GlyphPairAdjustmentRecords = i1122
  var i1125 = i1117[3]
  var i1124 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i1125.length; i += 1) {
    i1124.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i1125[i + 0]));
  }
  i1116.m_MarkToBaseAdjustmentRecords = i1124
  var i1127 = i1117[4]
  var i1126 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i1127.length; i += 1) {
    i1126.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i1127[i + 0]));
  }
  i1116.m_MarkToMarkAdjustmentRecords = i1126
  return i1116
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i1130 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i1131 = data
  i1130.m_TargetGlyphID = i1131[0]
  i1130.m_SubstituteGlyphIDs = i1131[1]
  return i1130
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i1134 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i1135 = data
  i1134.m_ComponentGlyphIDs = i1135[0]
  i1134.m_LigatureGlyphID = i1135[1]
  return i1134
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i1138 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i1139 = data
  i1138.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i1139[0], i1138.m_FirstAdjustmentRecord)
  i1138.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i1139[1], i1138.m_SecondAdjustmentRecord)
  i1138.m_FeatureLookupFlags = i1139[2]
  return i1138
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i1140 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i1141 = data
  i1140.m_GlyphIndex = i1141[0]
  i1140.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i1141[1], i1140.m_GlyphValueRecord)
  return i1140
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i1142 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i1143 = data
  i1142.m_XPlacement = i1143[0]
  i1142.m_YPlacement = i1143[1]
  i1142.m_XAdvance = i1143[2]
  i1142.m_YAdvance = i1143[3]
  return i1142
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i1146 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i1147 = data
  i1146.m_BaseGlyphID = i1147[0]
  i1146.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i1147[1], i1146.m_BaseGlyphAnchorPoint)
  i1146.m_MarkGlyphID = i1147[2]
  i1146.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i1147[3], i1146.m_MarkPositionAdjustment)
  return i1146
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i1150 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i1151 = data
  i1150.m_BaseMarkGlyphID = i1151[0]
  i1150.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i1151[1], i1150.m_BaseMarkGlyphAnchorPoint)
  i1150.m_CombiningMarkGlyphID = i1151[2]
  i1150.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i1151[3], i1150.m_CombiningMarkPositionAdjustment)
  return i1150
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i1156 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i1157 = data
  request.r(i1157[0], i1157[1], 0, i1156, 'regularTypeface')
  request.r(i1157[2], i1157[3], 0, i1156, 'italicTypeface')
  return i1156
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i1158 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i1159 = data
  i1158.Name = i1159[0]
  i1158.PointSize = i1159[1]
  i1158.Scale = i1159[2]
  i1158.CharacterCount = i1159[3]
  i1158.LineHeight = i1159[4]
  i1158.Baseline = i1159[5]
  i1158.Ascender = i1159[6]
  i1158.CapHeight = i1159[7]
  i1158.Descender = i1159[8]
  i1158.CenterLine = i1159[9]
  i1158.SuperscriptOffset = i1159[10]
  i1158.SubscriptOffset = i1159[11]
  i1158.SubSize = i1159[12]
  i1158.Underline = i1159[13]
  i1158.UnderlineThickness = i1159[14]
  i1158.strikethrough = i1159[15]
  i1158.strikethroughThickness = i1159[16]
  i1158.TabWidth = i1159[17]
  i1158.Padding = i1159[18]
  i1158.AtlasWidth = i1159[19]
  i1158.AtlasHeight = i1159[20]
  return i1158
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i1162 = root || request.c( 'TMPro.TMP_Glyph' )
  var i1163 = data
  i1162.id = i1163[0]
  i1162.x = i1163[1]
  i1162.y = i1163[2]
  i1162.width = i1163[3]
  i1162.height = i1163[4]
  i1162.xOffset = i1163[5]
  i1162.yOffset = i1163[6]
  i1162.xAdvance = i1163[7]
  i1162.scale = i1163[8]
  return i1162
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i1164 = root || request.c( 'TMPro.KerningTable' )
  var i1165 = data
  var i1167 = i1165[0]
  var i1166 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i1167.length; i += 1) {
    i1166.add(request.d('TMPro.KerningPair', i1167[i + 0]));
  }
  i1164.kerningPairs = i1166
  return i1164
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i1170 = root || request.c( 'TMPro.KerningPair' )
  var i1171 = data
  i1170.xOffset = i1171[0]
  i1170.m_FirstGlyph = i1171[1]
  i1170.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i1171[2], i1170.m_FirstGlyphAdjustments)
  i1170.m_SecondGlyph = i1171[3]
  i1170.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i1171[4], i1170.m_SecondGlyphAdjustments)
  i1170.m_IgnoreSpacingAdjustments = !!i1171[5]
  return i1170
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i1172 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i1173 = data
  i1172.m_FaceIndex = i1173[0]
  i1172.m_FamilyName = i1173[1]
  i1172.m_StyleName = i1173[2]
  i1172.m_PointSize = i1173[3]
  i1172.m_Scale = i1173[4]
  i1172.m_UnitsPerEM = i1173[5]
  i1172.m_LineHeight = i1173[6]
  i1172.m_AscentLine = i1173[7]
  i1172.m_CapLine = i1173[8]
  i1172.m_MeanLine = i1173[9]
  i1172.m_Baseline = i1173[10]
  i1172.m_DescentLine = i1173[11]
  i1172.m_SuperscriptOffset = i1173[12]
  i1172.m_SuperscriptSize = i1173[13]
  i1172.m_SubscriptOffset = i1173[14]
  i1172.m_SubscriptSize = i1173[15]
  i1172.m_UnderlineOffset = i1173[16]
  i1172.m_UnderlineThickness = i1173[17]
  i1172.m_StrikethroughOffset = i1173[18]
  i1172.m_StrikethroughThickness = i1173[19]
  i1172.m_TabWidth = i1173[20]
  return i1172
}

Deserializers["EquipmentSetData"] = function (request, data, root) {
  var i1174 = root || request.c( 'EquipmentSetData' )
  var i1175 = data
  request.r(i1175[0], i1175[1], 0, i1174, 'targetSkeletonDataAsset')
  var i1177 = i1175[2]
  var i1176 = new (System.Collections.Generic.List$1(Bridge.ns('System.String')))
  for(var i = 0; i < i1177.length; i += 1) {
    i1176.add(i1177[i + 0]);
  }
  i1174.skinNames = i1176
  return i1174
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i1178 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i1179 = data
  i1178.useSafeMode = !!i1179[0]
  i1178.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i1179[1], i1178.safeModeOptions)
  i1178.timeScale = i1179[2]
  i1178.unscaledTimeScale = i1179[3]
  i1178.useSmoothDeltaTime = !!i1179[4]
  i1178.maxSmoothUnscaledTime = i1179[5]
  i1178.rewindCallbackMode = i1179[6]
  i1178.showUnityEditorReport = !!i1179[7]
  i1178.logBehaviour = i1179[8]
  i1178.drawGizmos = !!i1179[9]
  i1178.defaultRecyclable = !!i1179[10]
  i1178.defaultAutoPlay = i1179[11]
  i1178.defaultUpdateType = i1179[12]
  i1178.defaultTimeScaleIndependent = !!i1179[13]
  i1178.defaultEaseType = i1179[14]
  i1178.defaultEaseOvershootOrAmplitude = i1179[15]
  i1178.defaultEasePeriod = i1179[16]
  i1178.defaultAutoKill = !!i1179[17]
  i1178.defaultLoopType = i1179[18]
  i1178.debugMode = !!i1179[19]
  i1178.debugStoreTargetId = !!i1179[20]
  i1178.showPreviewPanel = !!i1179[21]
  i1178.storeSettingsLocation = i1179[22]
  i1178.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i1179[23], i1178.modules)
  i1178.createASMDEF = !!i1179[24]
  i1178.showPlayingTweens = !!i1179[25]
  i1178.showPausedTweens = !!i1179[26]
  return i1178
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i1180 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i1181 = data
  i1180.logBehaviour = i1181[0]
  i1180.nestedTweenFailureBehaviour = i1181[1]
  return i1180
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i1182 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i1183 = data
  i1182.showPanel = !!i1183[0]
  i1182.audioEnabled = !!i1183[1]
  i1182.physicsEnabled = !!i1183[2]
  i1182.physics2DEnabled = !!i1183[3]
  i1182.spriteEnabled = !!i1183[4]
  i1182.uiEnabled = !!i1183[5]
  i1182.uiToolkitEnabled = !!i1183[6]
  i1182.textMeshProEnabled = !!i1183[7]
  i1182.tk2DEnabled = !!i1183[8]
  i1182.deAudioEnabled = !!i1183[9]
  i1182.deUnityExtendedEnabled = !!i1183[10]
  i1182.epoOutlineEnabled = !!i1183[11]
  return i1182
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i1184 = root || request.c( 'TMPro.TMP_Settings' )
  var i1185 = data
  i1184.assetVersion = i1185[0]
  i1184.m_TextWrappingMode = i1185[1]
  i1184.m_enableKerning = !!i1185[2]
  var i1187 = i1185[3]
  var i1186 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i1187.length; i += 1) {
    i1186.add(i1187[i + 0]);
  }
  i1184.m_ActiveFontFeatures = i1186
  i1184.m_enableExtraPadding = !!i1185[4]
  i1184.m_enableTintAllSprites = !!i1185[5]
  i1184.m_enableParseEscapeCharacters = !!i1185[6]
  i1184.m_EnableRaycastTarget = !!i1185[7]
  i1184.m_GetFontFeaturesAtRuntime = !!i1185[8]
  i1184.m_missingGlyphCharacter = i1185[9]
  i1184.m_ClearDynamicDataOnBuild = !!i1185[10]
  i1184.m_warningsDisabled = !!i1185[11]
  request.r(i1185[12], i1185[13], 0, i1184, 'm_defaultFontAsset')
  i1184.m_defaultFontAssetPath = i1185[14]
  i1184.m_defaultFontSize = i1185[15]
  i1184.m_defaultAutoSizeMinRatio = i1185[16]
  i1184.m_defaultAutoSizeMaxRatio = i1185[17]
  i1184.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i1185[18], i1185[19] )
  i1184.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i1185[20], i1185[21] )
  i1184.m_autoSizeTextContainer = !!i1185[22]
  i1184.m_IsTextObjectScaleStatic = !!i1185[23]
  var i1189 = i1185[24]
  var i1188 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1189.length; i += 2) {
  request.r(i1189[i + 0], i1189[i + 1], 1, i1188, '')
  }
  i1184.m_fallbackFontAssets = i1188
  i1184.m_matchMaterialPreset = !!i1185[25]
  i1184.m_HideSubTextObjects = !!i1185[26]
  request.r(i1185[27], i1185[28], 0, i1184, 'm_defaultSpriteAsset')
  i1184.m_defaultSpriteAssetPath = i1185[29]
  i1184.m_enableEmojiSupport = !!i1185[30]
  i1184.m_MissingCharacterSpriteUnicode = i1185[31]
  var i1191 = i1185[32]
  var i1190 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i1191.length; i += 2) {
  request.r(i1191[i + 0], i1191[i + 1], 1, i1190, '')
  }
  i1184.m_EmojiFallbackTextAssets = i1190
  i1184.m_defaultColorGradientPresetsPath = i1185[33]
  request.r(i1185[34], i1185[35], 0, i1184, 'm_defaultStyleSheet')
  i1184.m_StyleSheetsResourcePath = i1185[36]
  request.r(i1185[37], i1185[38], 0, i1184, 'm_leadingCharacters')
  request.r(i1185[39], i1185[40], 0, i1184, 'm_followingCharacters')
  i1184.m_UseModernHangulLineBreakingRules = !!i1185[41]
  return i1184
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i1194 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i1195 = data
  request.r(i1195[0], i1195[1], 0, i1194, 'spriteSheet')
  var i1197 = i1195[2]
  var i1196 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i1197.length; i += 1) {
    i1196.add(request.d('TMPro.TMP_Sprite', i1197[i + 0]));
  }
  i1194.spriteInfoList = i1196
  var i1199 = i1195[3]
  var i1198 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i1199.length; i += 2) {
  request.r(i1199[i + 0], i1199[i + 1], 1, i1198, '')
  }
  i1194.fallbackSpriteAssets = i1198
  var i1201 = i1195[4]
  var i1200 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i1201.length; i += 1) {
    i1200.add(request.d('TMPro.TMP_SpriteCharacter', i1201[i + 0]));
  }
  i1194.m_SpriteCharacterTable = i1200
  var i1203 = i1195[5]
  var i1202 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i1203.length; i += 1) {
    i1202.add(request.d('TMPro.TMP_SpriteGlyph', i1203[i + 0]));
  }
  i1194.m_GlyphTable = i1202
  i1194.m_Version = i1195[6]
  i1194.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i1195[7], i1194.m_FaceInfo)
  request.r(i1195[8], i1195[9], 0, i1194, 'm_Material')
  return i1194
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i1206 = root || request.c( 'TMPro.TMP_Sprite' )
  var i1207 = data
  i1206.name = i1207[0]
  i1206.hashCode = i1207[1]
  i1206.unicode = i1207[2]
  i1206.pivot = new pc.Vec2( i1207[3], i1207[4] )
  request.r(i1207[5], i1207[6], 0, i1206, 'sprite')
  i1206.id = i1207[7]
  i1206.x = i1207[8]
  i1206.y = i1207[9]
  i1206.width = i1207[10]
  i1206.height = i1207[11]
  i1206.xOffset = i1207[12]
  i1206.yOffset = i1207[13]
  i1206.xAdvance = i1207[14]
  i1206.scale = i1207[15]
  return i1206
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i1212 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i1213 = data
  i1212.m_Name = i1213[0]
  i1212.m_ElementType = i1213[1]
  i1212.m_Unicode = i1213[2]
  i1212.m_GlyphIndex = i1213[3]
  i1212.m_Scale = i1213[4]
  return i1212
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i1216 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i1217 = data
  request.r(i1217[0], i1217[1], 0, i1216, 'sprite')
  i1216.m_Index = i1217[2]
  i1216.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i1217[3], i1216.m_Metrics)
  i1216.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i1217[4], i1216.m_GlyphRect)
  i1216.m_Scale = i1217[5]
  i1216.m_AtlasIndex = i1217[6]
  i1216.m_ClassDefinitionType = i1217[7]
  return i1216
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i1218 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i1219 = data
  var i1221 = i1219[0]
  var i1220 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i1221.length; i += 1) {
    i1220.add(request.d('TMPro.TMP_Style', i1221[i + 0]));
  }
  i1218.m_StyleList = i1220
  return i1218
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i1224 = root || request.c( 'TMPro.TMP_Style' )
  var i1225 = data
  i1224.m_Name = i1225[0]
  i1224.m_HashCode = i1225[1]
  i1224.m_OpeningDefinition = i1225[2]
  i1224.m_ClosingDefinition = i1225[3]
  i1224.m_OpeningTagArray = i1225[4]
  i1224.m_ClosingTagArray = i1225[5]
  return i1224
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i1226 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i1227 = data
  var i1229 = i1227[0]
  var i1228 = []
  for(var i = 0; i < i1229.length; i += 1) {
    i1228.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i1229[i + 0]) );
  }
  i1226.files = i1228
  i1226.componentToPrefabIds = i1227[1]
  return i1226
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i1232 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i1233 = data
  i1232.path = i1233[0]
  request.r(i1233[1], i1233[2], 0, i1232, 'unityObject')
  return i1232
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i1234 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i1235 = data
  var i1237 = i1235[0]
  var i1236 = []
  for(var i = 0; i < i1237.length; i += 1) {
    i1236.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i1237[i + 0]) );
  }
  i1234.scriptsExecutionOrder = i1236
  var i1239 = i1235[1]
  var i1238 = []
  for(var i = 0; i < i1239.length; i += 1) {
    i1238.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i1239[i + 0]) );
  }
  i1234.sortingLayers = i1238
  var i1241 = i1235[2]
  var i1240 = []
  for(var i = 0; i < i1241.length; i += 1) {
    i1240.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i1241[i + 0]) );
  }
  i1234.cullingLayers = i1240
  i1234.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i1235[3], i1234.timeSettings)
  i1234.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i1235[4], i1234.physicsSettings)
  i1234.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i1235[5], i1234.physics2DSettings)
  i1234.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1235[6], i1234.qualitySettings)
  i1234.enableRealtimeShadows = !!i1235[7]
  i1234.enableAutoInstancing = !!i1235[8]
  i1234.enableStaticBatching = !!i1235[9]
  i1234.enableDynamicBatching = !!i1235[10]
  i1234.lightmapEncodingQuality = i1235[11]
  i1234.desiredColorSpace = i1235[12]
  var i1243 = i1235[13]
  var i1242 = []
  for(var i = 0; i < i1243.length; i += 1) {
    i1242.push( i1243[i + 0] );
  }
  i1234.allTags = i1242
  return i1234
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i1246 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i1247 = data
  i1246.name = i1247[0]
  i1246.value = i1247[1]
  return i1246
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i1250 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i1251 = data
  i1250.id = i1251[0]
  i1250.name = i1251[1]
  i1250.value = i1251[2]
  return i1250
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i1254 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i1255 = data
  i1254.id = i1255[0]
  i1254.name = i1255[1]
  return i1254
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i1256 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i1257 = data
  i1256.fixedDeltaTime = i1257[0]
  i1256.maximumDeltaTime = i1257[1]
  i1256.timeScale = i1257[2]
  i1256.maximumParticleTimestep = i1257[3]
  return i1256
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i1258 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i1259 = data
  i1258.gravity = new pc.Vec3( i1259[0], i1259[1], i1259[2] )
  i1258.defaultSolverIterations = i1259[3]
  i1258.bounceThreshold = i1259[4]
  i1258.autoSyncTransforms = !!i1259[5]
  i1258.autoSimulation = !!i1259[6]
  var i1261 = i1259[7]
  var i1260 = []
  for(var i = 0; i < i1261.length; i += 1) {
    i1260.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i1261[i + 0]) );
  }
  i1258.collisionMatrix = i1260
  return i1258
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i1264 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i1265 = data
  i1264.enabled = !!i1265[0]
  i1264.layerId = i1265[1]
  i1264.otherLayerId = i1265[2]
  return i1264
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i1266 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i1267 = data
  request.r(i1267[0], i1267[1], 0, i1266, 'material')
  i1266.gravity = new pc.Vec2( i1267[2], i1267[3] )
  i1266.positionIterations = i1267[4]
  i1266.velocityIterations = i1267[5]
  i1266.velocityThreshold = i1267[6]
  i1266.maxLinearCorrection = i1267[7]
  i1266.maxAngularCorrection = i1267[8]
  i1266.maxTranslationSpeed = i1267[9]
  i1266.maxRotationSpeed = i1267[10]
  i1266.baumgarteScale = i1267[11]
  i1266.baumgarteTOIScale = i1267[12]
  i1266.timeToSleep = i1267[13]
  i1266.linearSleepTolerance = i1267[14]
  i1266.angularSleepTolerance = i1267[15]
  i1266.defaultContactOffset = i1267[16]
  i1266.autoSimulation = !!i1267[17]
  i1266.queriesHitTriggers = !!i1267[18]
  i1266.queriesStartInColliders = !!i1267[19]
  i1266.callbacksOnDisable = !!i1267[20]
  i1266.reuseCollisionCallbacks = !!i1267[21]
  i1266.autoSyncTransforms = !!i1267[22]
  var i1269 = i1267[23]
  var i1268 = []
  for(var i = 0; i < i1269.length; i += 1) {
    i1268.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i1269[i + 0]) );
  }
  i1266.collisionMatrix = i1268
  return i1266
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i1272 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i1273 = data
  i1272.enabled = !!i1273[0]
  i1272.layerId = i1273[1]
  i1272.otherLayerId = i1273[2]
  return i1272
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i1274 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i1275 = data
  var i1277 = i1275[0]
  var i1276 = []
  for(var i = 0; i < i1277.length; i += 1) {
    i1276.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1277[i + 0]) );
  }
  i1274.qualityLevels = i1276
  var i1279 = i1275[1]
  var i1278 = []
  for(var i = 0; i < i1279.length; i += 1) {
    i1278.push( i1279[i + 0] );
  }
  i1274.names = i1278
  i1274.shadows = i1275[2]
  i1274.anisotropicFiltering = i1275[3]
  i1274.antiAliasing = i1275[4]
  i1274.lodBias = i1275[5]
  i1274.shadowCascades = i1275[6]
  i1274.shadowDistance = i1275[7]
  i1274.shadowmaskMode = i1275[8]
  i1274.shadowProjection = i1275[9]
  i1274.shadowResolution = i1275[10]
  i1274.softParticles = !!i1275[11]
  i1274.softVegetation = !!i1275[12]
  i1274.activeColorSpace = i1275[13]
  i1274.desiredColorSpace = i1275[14]
  i1274.masterTextureLimit = i1275[15]
  i1274.maxQueuedFrames = i1275[16]
  i1274.particleRaycastBudget = i1275[17]
  i1274.pixelLightCount = i1275[18]
  i1274.realtimeReflectionProbes = !!i1275[19]
  i1274.shadowCascade2Split = i1275[20]
  i1274.shadowCascade4Split = new pc.Vec3( i1275[21], i1275[22], i1275[23] )
  i1274.streamingMipmapsActive = !!i1275[24]
  i1274.vSyncCount = i1275[25]
  i1274.asyncUploadBufferSize = i1275[26]
  i1274.asyncUploadTimeSlice = i1275[27]
  i1274.billboardsFaceCameraPosition = !!i1275[28]
  i1274.shadowNearPlaneOffset = i1275[29]
  i1274.streamingMipmapsMemoryBudget = i1275[30]
  i1274.maximumLODLevel = i1275[31]
  i1274.streamingMipmapsAddAllCameras = !!i1275[32]
  i1274.streamingMipmapsMaxLevelReduction = i1275[33]
  i1274.streamingMipmapsRenderersPerFrame = i1275[34]
  i1274.resolutionScalingFixedDPIFactor = i1275[35]
  i1274.streamingMipmapsMaxFileIORequests = i1275[36]
  i1274.currentQualityLevel = i1275[37]
  return i1274
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i1284 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i1285 = data
  i1284.weight = i1285[0]
  i1284.vertices = i1285[1]
  i1284.normals = i1285[2]
  i1284.tangents = i1285[3]
  return i1284
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition"] = function (request, data, root) {
  var i1288 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition' )
  var i1289 = data
  i1288.mode = i1289[0]
  i1288.parameter = i1289[1]
  i1288.threshold = i1289[2]
  return i1288
}

Deserializers["TMPro.GlyphAnchorPoint"] = function (request, data, root) {
  var i1290 = root || request.c( 'TMPro.GlyphAnchorPoint' )
  var i1291 = data
  i1290.m_XCoordinate = i1291[0]
  i1290.m_YCoordinate = i1291[1]
  return i1290
}

Deserializers["TMPro.MarkPositionAdjustment"] = function (request, data, root) {
  var i1292 = root || request.c( 'TMPro.MarkPositionAdjustment' )
  var i1293 = data
  i1292.m_XPositionAdjustment = i1293[0]
  i1292.m_YPositionAdjustment = i1293[1]
  return i1292
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i1294 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i1295 = data
  i1294.xPlacement = i1295[0]
  i1294.yPlacement = i1295[1]
  i1294.xAdvance = i1295[2]
  i1294.yAdvance = i1295[3]
  return i1294
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"useSimplification":2,"useUInt32IndexFormat":3,"vertexCount":4,"aabb":5,"streams":6,"vertices":7,"subMeshes":8,"bindposes":9,"blendShapes":10},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Components.Transform":{"position":0,"scale":3,"rotation":6},"Luna.Unity.DTO.UnityEngine.Components.Animator":{"animatorController":0,"avatar":2,"updateMode":4,"hasTransformHierarchy":5,"applyRootMotion":6,"humanBones":7,"enabled":8},"Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer":{"color":0,"sprite":4,"flipX":6,"flipY":7,"drawMode":8,"size":9,"tileMode":11,"adaptiveModeThreshold":12,"maskInteraction":13,"spriteSortPoint":14,"enabled":15,"sharedMaterial":16,"sharedMaterials":18,"receiveShadows":19,"shadowCastingMode":20,"sortingLayerID":21,"sortingOrder":22,"lightmapIndex":23,"lightmapSceneIndex":24,"lightmapScaleOffset":25,"lightProbeUsage":29,"reflectionProbeUsage":30},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider":{"center":0,"radius":3,"height":4,"direction":5,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"referenceAmbientProbe":36,"useReferenceAmbientProbe":37,"customReflection":38,"defaultReflection":40,"defaultReflectionMode":42,"defaultReflectionResolution":43,"sunLightObjectId":44,"pixelLightCount":45,"defaultReflectionHDR":46,"hasLightDataAsset":47,"hasManualGenerate":48},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip":{"name":0,"wrapMode":1,"isLooping":2,"length":3,"curves":4,"events":5,"halfPrecision":6,"_frameRate":7,"localBounds":8,"hasMuscleCurves":9,"clipMuscleConstant":10,"clipBindingConstant":11},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve":{"path":0,"hash":1,"componentType":2,"property":3,"keys":4,"objectReferenceKeys":5},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey":{"time":0,"value":1},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent":{"functionName":0,"floatParameter":1,"intParameter":2,"stringParameter":3,"objectReferenceParameter":4,"time":6},"Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds":{"center":0,"extends":3},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant":{"genericBindings":0,"pptrCurveMapping":1},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController":{"name":0,"layers":1,"parameters":2,"animationClips":3,"avatarUnsupported":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer":{"name":0,"defaultWeight":1,"blendingMode":2,"avatarMask":3,"syncedLayerIndex":4,"syncedLayerAffectsTiming":5,"syncedLayers":6,"stateMachine":7},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine":{"id":0,"name":1,"path":2,"states":3,"machines":4,"entryStateTransitions":5,"exitStateTransitions":6,"anyStateTransitions":7,"defaultStateId":8},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState":{"id":0,"name":1,"cycleOffset":2,"cycleOffsetParameter":3,"cycleOffsetParameterActive":4,"mirror":5,"mirrorParameter":6,"mirrorParameterActive":7,"motionId":8,"nameHash":9,"fullPathHash":10,"speed":11,"speedParameter":12,"speedParameterActive":13,"tag":14,"tagHash":15,"writeDefaultValues":16,"behaviours":17,"transitions":18},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition":{"fullPath":0,"canTransitionToSelf":1,"duration":2,"exitTime":3,"hasExitTime":4,"hasFixedDuration":5,"interruptionSource":6,"offset":7,"orderedInterruption":8,"destinationStateId":9,"isExit":10,"mute":11,"solo":12,"conditions":13},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition":{"destinationStateId":0,"isExit":1,"mute":2,"solo":3,"conditions":4},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter":{"defaultBool":0,"defaultFloat":1,"defaultInt":2,"name":3,"nameHash":4,"type":5},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"lightmapEncodingQuality":11,"desiredColorSpace":12,"allTags":13},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition":{"mode":0,"parameter":1,"threshold":2}}

Deserializers.requiredComponents = {"46":[47],"48":[47],"49":[47],"50":[47],"51":[47],"52":[47],"53":[54],"55":[8],"56":[57],"58":[57],"59":[57],"60":[57],"61":[57],"62":[57],"63":[64],"65":[64],"66":[64],"67":[64],"68":[64],"69":[64],"70":[64],"71":[64],"72":[64],"73":[64],"74":[64],"75":[64],"76":[64],"77":[8],"78":[31],"79":[80],"81":[80],"82":[33],"11":[8],"83":[84],"85":[33],"86":[87,33],"32":[31],"88":[87,33],"89":[3,31],"90":[31],"91":[31,29],"92":[57],"93":[64],"94":[84],"95":[96],"97":[5],"98":[8],"99":[100],"101":[37],"102":[82],"103":[33],"35":[31,33],"104":[33,87],"105":[33],"106":[87,33],"107":[31],"108":[87,33],"109":[33],"110":[111],"112":[111],"113":[111],"114":[33],"115":[33],"116":[82],"117":[87,33],"118":[33],"119":[82],"120":[33],"121":[33],"122":[33],"123":[33],"124":[33],"125":[33],"126":[33],"127":[33],"128":[33],"129":[87,33],"130":[33],"131":[33],"132":[33],"133":[33],"134":[87,33],"135":[33],"136":[37],"137":[37],"38":[37],"138":[37],"139":[8],"140":[8]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Texture2D","UnityEngine.Transform","UnityEngine.Animator","UnityEditor.Animations.AnimatorController","UnityEngine.SpriteRenderer","UnityEngine.Sprite","UnityEngine.Material","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.MonoBehaviour","AutoCameraFit","CharacterManager","Character","EquipmentSetData","Spine.Unity.SkeletonDataAsset","GameManager","SlotManager","SlotSetup","UnityEngine.GameObject","Ply_Pool","Ply_SoundManager","UnityEngine.AudioClip","UnityEngine.AudioSource","ProgressTrackingManager","UnityEngine.CapsuleCollider","BalloonController","BalloonActionTrigger","SlotDataSO","UnityEngine.MeshFilter","UnityEngine.Mesh","UnityEngine.MeshRenderer","Spine.Unity.SkeletonAnimation","UnityEngine.RectTransform","UnityEngine.EventSystems.UIBehaviour","TMPro.TextMeshPro","TMPro.TMP_FontAsset","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","Spine.Unity.SpineAtlasAsset","UnityEngine.TextAsset","UnityEngine.Font","DG.Tweening.Core.DOTweenSettings","TMPro.TMP_Settings","TMPro.TMP_SpriteAsset","TMPro.TMP_StyleSheet","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.SkinnedMeshRenderer","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.Canvas","Spine.Unity.EditorSkeletonPlayer","Spine.Unity.ISkeletonAnimation","Spine.Unity.BoneFollowerGraphic","Spine.Unity.SkeletonSubmeshGraphic","UnityEngine.CanvasRenderer","Spine.Unity.SkeletonGraphic","Spine.Unity.SkeletonMecanim","Spine.Unity.SkeletonRenderer","Spine.Unity.SkeletonPartsRenderer","Spine.Unity.FollowLocationRigidbody","Spine.Unity.FollowLocationRigidbody2D","Spine.Unity.SkeletonUtility","Spine.Unity.SkeletonUtilityConstraint","Spine.Unity.SkeletonUtilityBone","UnityEngine.U2D.Animation.SpriteSkin","UnityEngine.U2D.PixelPerfectCamera","UnityEngine.U2D.SpriteShapeController","UnityEngine.U2D.SpriteShapeRenderer","UnityEngine.InputSystem.UI.InputSystemUIInputModule","UnityEngine.InputSystem.UI.TrackedDeviceRaycaster","TMPro.TextContainer","TMPro.TextMeshProUGUI","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.GraphicRaycaster","UnityEngine.UI.Image","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.CanvasScaler","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.Mask","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.Scrollbar","UnityEngine.UI.ScrollRect","UnityEngine.UI.Slider","UnityEngine.UI.Text","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.38f1";

Deserializers.productName = "PLY_LeftOrRight";

Deserializers.lunaInitializationTime = "07/24/2026 10:13:04";

Deserializers.lunaDaysRunning = "2.9";

Deserializers.lunaVersion = "7.1.0";

Deserializers.lunaSHA = "cf93782349542fe0b84ad13951a26809f8419628";

Deserializers.creativeName = "";

Deserializers.lunaAppID = "0";

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

Deserializers.runtimeAnalysisExcludedClassesCount = "1937";

Deserializers.runtimeAnalysisExcludedMethodsCount = "5425";

Deserializers.runtimeAnalysisExcludedModules = "physics2d, particle-system";

Deserializers.isRuntimeAnalysisEnabledForShaders = "True";

Deserializers.isRealtimeShadowsEnabled = "False";

Deserializers.isReferenceAmbientProbeBaked = "False";

Deserializers.isLunaCompilerV2Used = "True";

Deserializers.companyName = "DefaultCompany";

Deserializers.buildPlatform = "StandaloneWindows64";

Deserializers.applicationIdentifier = "com.DefaultCompany.PLY-LeftOrRight";

Deserializers.disableAntiAliasing = false;

Deserializers.graphicsConstraint = 24;

Deserializers.linearColorSpace = false;

Deserializers.buildID = "9e96823d-8dfa-4d86-98d0-0f81ea52dde1";

Deserializers.runtimeInitializeOnLoadInfos = [[["Unity","Services","Core","Internal","UnityServicesInitializer","EnableServicesInitializationAsync"],["UnityEngine","U2D","Animation","GpuDeformationSystem","CreateFallbackBuffer"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["DG","Tweening","DOTween","RuntimeOnLoad"],["Sirenix","Utilities","UnityVersion","EnsureLoaded"],["Sirenix","Serialization","Utilities","UnityVersion","EnsureLoaded"],["Sirenix","Serialization","UnitySerializationInitializer","InitializeRuntime"],["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["Unity","Services","Core","Registration","CorePackageInitializer","InitializeOnLoad"],["Unity","Services","Core","Internal","TaskAsyncOperation","SetScheduler"],["Unity","Services","Core","Environments","Client","Scheduler","EngineStateHelper","Init"],["Unity","Services","Core","Environments","Client","Scheduler","ThreadHelper","Init"],["Ua2CoreInitializeCallback","Register"],["UnityEngine","InputSystem","InputSystem","RunInitialUpdate"],["Unity","AI","Navigation","NavMeshLink","ClearTrackedList"],["Unity","AI","Navigation","NavMeshSurface","ClearNavMeshSurfaces"],["Unity","AI","Navigation","NavMeshModifierVolume","ClearNavMeshModifiers"],["Unity","AI","Navigation","NavMeshModifier","ClearNavMeshModifiers"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["Unity","Services","Core","Internal","UnityServicesInitializer","CreateStaticInstance"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"]],[["Unity","Services","Core","Environments","Client","Http","JsonHelpers","RegisterTypesForAOT"]],[["Unity","Services","Core","UnityThreadUtils","CaptureUnityThreadInfo"],["UnityEngine","InputSystem","Plugins","InputForUI","InputSystemProvider","Bootstrap"],["UnityEngine","InputSystem","InputSystem","RunInitializeInPlayer"],["Spine","Unity","AttachmentTools","AtlasUtilities","Init"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

